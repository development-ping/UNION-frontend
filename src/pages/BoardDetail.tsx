import Comment from '../components/BoardDetail/Comment';
import Content from '../components/BoardDetail/Content';
import Footer from '../components/BoardDetail/Footer';
import Header from '../components/BoardDetail/Header';
import '../style.css';

export default function BoardDetail() {
  return (
    <div className="h-full w-full flex flex-col py-3 px-[30px]">
      <Header />

      <div className="flex flex-col overflow-y-auto flex-1 hidden-scrollbar relative">
        <Content />
        <Comment />
      </div>

      <Footer />
    </div>
  );
}
