import "./About.css";
import {Helmet} from 'react-helmet';
export default function Dashboard(){
    return (
        <div className="about">
            <Helmet>
                <style>{'body { background-color: #EAE7B1; }'}</style>
            </Helmet>
            <h1>Dashboard</h1>
        </div>
    );

}