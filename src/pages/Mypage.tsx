import LogoutBtn from '../components/Mypage/LogoutBtn';
import MyCalendar from '../components/Mypage/MyCalendar';
import MypageMenuList from '../components/Mypage/MypageMenuList';
import Title from '../components/Mypage/Title';
import 'react-calendar/dist/Calendar.css';
import Footer from '../components/Profile/Footer';
import User from '../common/User';
import { useNavigate } from 'react-router-dom';

export default function Mypage() {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full flex flex-col">
      <Title />
      <div className="flex flex-col flex-grow px-[33px]">
        <User
          name="찐 감자"
          university="구름대학교"
          bio="한 줄 자기 소개가 들어갑니다!"
          buttonLabel="내 정보 수정"
          buttonWidth="100px"
          onButtonClick={() => navigate('/EditProfile')}
        />
        <MypageMenuList />
        <MyCalendar />
        <LogoutBtn />
        <div className="py-3">
          <Footer />
        </div>
      </div>
    </div>
  );
}
