import Slide from '../../common/Slide';
import Vote from './Vote';
import { BoardInfo } from '../../pages/BoardDetail';
import DefaultImage from '/default-profile-image.png';
import { useSetRecoilState } from 'recoil';
import { selectedUserState } from '../../recoil/selectedUserState';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

interface Prop {
  boardContent: BoardInfo | undefined;
}

const Content = ({ boardContent }: Prop) => {
  const setUser = useSetRecoilState(selectedUserState);
  const navigate = useNavigate();

  const onClickeProfile = () => {
    if (boardContent?.author.token) {
      setUser(boardContent?.author.token);
      navigate('/userinfo');
    }
  };
  return (
    <div className="flex flex-col w-[85%]">
      <div className="flex items-center mt-[20px] gap-3">
        <div className="h-10 w-10 bg-gray-300 rounded-full cursor-pointer overflow-hidden" onClick={onClickeProfile}>
          {boardContent?.author.profileImage ? (
            <img src={boardContent.author.profileImage} />
          ) : (
            <img src={DefaultImage} />
          )}
        </div>
        <div>
          <div className="font-bold text-sm">
            {boardContent?.author.nickname}{' '}
            <span className="text-gray-400">{`· ${boardContent?.author.univName}`}</span>
          </div>
          <div className="font-semibold text-sm text-gray-400">{`${dayjs(boardContent?.createdAt).format(
            'YYYY년 MM/DD H:mm',
          )} 조회수 ${boardContent?.views}`}</div>
        </div>
      </div>

      <div className="mt-5 font-semibold text-xl">{boardContent?.title}</div>

      <div>
        <div className="mt-5 text-base">{boardContent?.content}</div>
      </div>

      {boardContent?.photos && boardContent?.photos.length > 0 && (
        <div className="mt-4 cursor-pointer">
          <Slide images={boardContent?.photos} />
        </div>
      )}

      <div className="mt-4">
        <Vote />
      </div>
    </div>
  );
};

export default Content;
