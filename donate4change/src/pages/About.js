import "./About.css";
import {Helmet} from 'react-helmet';

export default function Admin(){
    return (
        <div className="about">
            <Helmet>
                <style>{'body { background-color: #EAE7B1; }'}</style>
            </Helmet>
            <h1>About</h1>
        </div>
    );

}