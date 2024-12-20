import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import JoinMeetRequest from '../../api/JoinMeetRequest';
import { useParams } from 'react-router-dom';
import { Response } from '../../pages/MeetDetail';
import apiClient from '../../api/apiClient';
import Cookies from 'js-cookie';

interface Props {
  gatheringData: Response | null;
  onReadMeet: () => void;
}

const Footer = ({ gatheringData, onReadMeet }: Props) => {
  const fullMember = gatheringData?.maxMember === gatheringData?.currentMember;
  const [isPassDate, setIsPassDate] = useState(false);
  const [recruited, setRecruited] = useState(gatheringData?.recruited);
  const { id } = useParams();
  const MeetId = Number(id);

  useEffect(() => {
    if (gatheringData) {
      setIsPassDate(new Date() > new Date(gatheringData.gatheringDateTime));
      setRecruited(gatheringData.recruited);
    }
  }, [gatheringData, isPassDate]);

  const onClickLikeHandler = async () => {
    try {
      const response = await apiClient.post(
        `/gatherings/like/${MeetId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: Cookies.get('Authorization'),
          },
        },
      );
      console.log(response.data);
      onReadMeet();
    } catch (error) {
      console.log(error);
    }
  };

  //모임글 참여 시 알람 create
  const MeetAlarm = async () => {
    try {
      await apiClient.post(
        '/notification/gathering',
        {
          typeId: MeetId,
        },
        {
          headers: {
            Authorization: Cookies.get('Authorization'),
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onClickParticipationHandler = async () => {
    if (!gatheringData?.joined && !fullMember && !isPassDate && !gatheringData?.recruited) {
      try {
        await JoinMeetRequest(MeetId);

        await MeetAlarm();
        onReadMeet();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.log(error.response.data);
          }
        }
      }
    }
  };

  const onClickOwner = async () => {
    if (!isPassDate && !fullMember) {
      try {
        const response = await apiClient.post(
          `/gatherings/${gatheringData?.id}/recruited`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: Cookies.get('Authorization'),
            },
          },
        );
        onReadMeet();
        setRecruited(response.data.recruited);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="h-auto border-t border-gray-150 flex items-center justify-between cursor-pointer pb-3 pt-3">
      <div className="ml-4" onClick={onClickLikeHandler}>
        {gatheringData?.liked ? (
          <IoIosHeart size={24} style={{ color: '#ff4a4d' }} />
        ) : (
          <IoIosHeartEmpty size={24} style={{ strokeWidth: 7 }} />
        )}
      </div>
      {gatheringData?.owner ? (
        <div
          className="w-[80%] h-[53px] rounded-md flex items-center justify-center text-xl text-white font-semibold cursor-pointer mr-2"
          style={{
            backgroundColor: `${recruited || isPassDate || fullMember ? 'gray' : '#ff4a4d'}`,
          }}
          onClick={onClickOwner}
        >
          모집마감
        </div>
      ) : (
        <div
          className="w-[80%] h-[53px] rounded-md flex items-center justify-center text-xl text-white font-semibold cursor-pointer mr-2"
          style={{
            backgroundColor: `${
              gatheringData?.joined ? 'gray' : fullMember || isPassDate || recruited ? 'gray ' : '#ff4a4d'
            }`,
          }}
          onClick={onClickParticipationHandler}
        >
          {gatheringData?.joined ? '참여완료' : fullMember || isPassDate || recruited ? '모집완료' : '참여하기'}
        </div>
      )}
    </div>
  );
};

export default Footer;
