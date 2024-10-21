import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FaCheck, FaRegCircle } from 'react-icons/fa6';
import { MdHowToVote } from 'react-icons/md';

const Vote = () => {
  const [select, setSelect] = useState(-1);
  const data = [
    { content: '엽떡', value: 2 },
    { content: '우아아아아아아이', value: 1 },
    { content: '치킨', value: 1 },
  ];

  const sum = 4;

  const [vote, setVote] = useState(false);

  const onClickItem = (index: number) => {
    setSelect(index);
  };

  const onClickVote = () => {
    setVote(true);
  };
  return (
    <div className="w-full h-auto border border-gray-300 rounded-md p-4 mb-2">
      <div>
        <div className="flex gap-1">
          <MdHowToVote />
          <span className="text-sm">투표제목</span>
        </div>
      </div>

      <div className="mt-1 ">
        {vote ? (
          <>
            {data.map((item, index) => (
              <div className="h-10 bg-gray-100 rounded-md mt-2 flex items-center" key={index}>
                <div
                  className={` h-full bg-gray-300 flex items-center  pl-3 rounded-l-md whitespace-nowrap`}
                  style={{ width: `${(item.value / sum) * 100}%` }}
                >
                  {select === index && <FaCheck size={14} className="mr-1 flex-shrink-0" />}
                  <span>{item.content}</span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {data.map((item, index) => (
              <div
                className="h-10 bg-gray-100 rounded-md mt-2 flex items-center pl-3 hover:bg-gray-200 cursor-pointer "
                key={index}
                onClick={() => onClickItem(index)}
              >
                {select === index ? (
                  <FaCheckCircle size={11} color="#ff4a4d" />
                ) : (
                  <FaRegCircle size={10} color="lightgry" style={{ strokeWidth: 2 }} />
                )}
                <span className="ml-3">{item.content}</span>
              </div>
            ))}
          </>
        )}
      </div>

      {/* 투표 안 했을 때 보이는 버튼 */}
      {!vote && (
        <div
          className="w-full h-10 flex justify-center items-center mt-2 text-white font-semibold rounded-md"
          style={{ backgroundColor: '#ff4a4d' }}
          onClick={onClickVote}
        >
          <div>투표하기</div>
        </div>
      )}
    </div>
  );
};

export default Vote;
