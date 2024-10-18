export default function ProfileInput() {
  return (
    <div className="mt-[60px]">
      <div className="flex justify-center">
        <button className="mt-[37px] w-[98px] h-[98px] bg-[#D9D9D9] rounded-full flex items-center justify-center"></button>
      </div>
      <label htmlFor="nickname" className="text-[16px] text-left block font-semibold mt-7">
        닉네임
      </label>
      <div className="">
        <input
          type="nickname"
          id="nickname"
          placeholder="예) 홍길동"
          className="border-b-[1.4px] border-[#C1C7CD] text-[14px] text-[#697077] bg-[#F2F4F8] placeholder-[#697077] focus:outline-none p-2 w-full mt-3 h-[40px] rounded-md "
        />
      </div>
      <label htmlFor="nickname" className="text-[16px] text-left block font-semibold mt-5">
        한 줄 소개
      </label>
      <div className="">
        <input
          type="nickname"
          id="nickname"
          placeholder="자기 소개가 들어갑니다"
          className="border-b-[1.4px] border-[#C1C7CD] text-[14px] text-[#697077] bg-[#F2F4F8] placeholder-[#697077] focus:outline-none p-2 w-full mt-3 h-[93px] rounded-md"
        />
      </div>
      <div className="text-center mt-[250px] ">
        <button className="text-[23px] font-semibold w-full bg-mainColor h-[63px] text-white p-2 rounded-md">
          다음
        </button>
      </div>
    </div>
  );
}
