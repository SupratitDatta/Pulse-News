import CategoryComponent from '../components/Category';
import News from '../components/News';
import Header from '../components/Header';
import '../css/home.css';

function Home() {
    return (
        <div className="home-container">
            <Header title="Pulse News" />
            <CategoryComponent />
            <div className="home-content">
                <News />
            </div>
        </div>
    );
}

export default Home;