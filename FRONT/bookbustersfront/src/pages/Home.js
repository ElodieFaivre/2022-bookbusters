import { Typography } from "@mui/material";
import Header from "../components/Header/Header";
import SignButtons from "../components/SignButtons/SignButtons";
import '../styles/Home.scss'

const Home = () => {
    return (
        <>
            <Header />
            <Typography variant="body1">
            Bon alors en garde, fils d’unijambiste. Alors dites vous que c’est un combat réel
            et montrez-moi ce que vous avez dans l’slibard! Ben évidemment que c’est vrai! Vous
            avez jamais dit que ça devait être faux! Ah ah Sire! Je vous attends! À moins que vous
            préfériez qu’on dise partout que le roi est une petite pédale qui pisse dans son froc à l’idée d’se battre!
            </Typography>
            <SignButtons />
        </>
    );
};

export default Home;
