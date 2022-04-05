import Header from "../components/Header/Header";
import SignButtons from "../components/SignButtons/SignButtons";
import '../styles/Home.scss'

const Home = () => {
    return (
        <div>
            <Header />

            <div className="text-container">
                     ipsum dolor sit amet, consectetur adipiscing elit. Curabitur accumsan tellus vitae ligula ultricies placerat. Vivamus mattis nulla lacus, vitae commodo massa blandit ut. Pellentesque lobortis velit nisi, at congue nibh ultrices quis. Etiam nec nunc ac ipsum sodales condimentum vel a urna. In et nisl sed purus semper pharetra. Duis vehicula sapien elit, eu auctor tortor rhoncus finibus. Vestibulum vestibulum tincidunt varius. Morbi nec mattis elit, at congue felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>

            <SignButtons />
        </div>
    );
};

export default Home;
