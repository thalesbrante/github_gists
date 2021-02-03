import {useState, useEffect} from 'react';
import { PAGE_LIMIT } from '../../config/config';
import Ockito from '../../services/ockito';
import { Gist } from '../Gist';

export function Gists(){
    const ockito = new Ockito();
    const [gists, setGists] = useState([]);
    const [username, setUsername] = useState("");
    const [publicSearch, setPublicSearch] = useState(false);
    const [page, setPage] = useState(0);

    useEffect(() => {    
        ockito.getPublicGists(page, PAGE_LIMIT).then(gists => {
            setGists(gists);
            return () => {}
        }).catch(()=>{
            setGists([]);
        })
    }, [publicSearch]);

    const searchByUsername = (e) => {
        e.preventDefault();
        setUsername("");
        if(e.target[0].value === "") {
            setPublicSearch(!publicSearch);
        }
        else {
            ockito.getUsernameGists(e.target[0].value).then(
                gists => {
                    console.log('gists')
                    setGists(gists);
                    return () => {}
                }).catch(()=>{
                    setGists([]);
                }
            )
        }
    }

    const loadMore = (e) => {
        e.preventDefault();
        ockito.getPublicGists(page+1, PAGE_LIMIT).then(newGists => {
            setGists([...gists, ...newGists]);
            setPage(page+1);
            return () => {}
        }).catch(()=>{
            setGists([]);
        })
    }

    return (
        <div style={{padding: 10}}>
            <h1>GitHub Gists</h1>
            <div>
                <form onSubmit={searchByUsername}>
                    <span> User: </span>
                    <input type="text" value={username} onChange={(e,v) => {e.preventDefault(); setUsername(v)}}></input>
                    <button type="submit"> Search </button> <span style={{fontSize: 12}}>Empty search for all gists</span>
                    
                </form>
            </div>
            <hr/>
            <ul>
                {gists.map((gist,idx) => {
                    return (
                        <li key={idx}>
                            <Gist gist={gist}/>
                        </li>
                    );
                })}
            </ul>
            <div style={{display:"flex"}}>
                <div style={{flex: 1, textAlign: 'center'}}>
                    <button onClick={loadMore}>Load More</button>
                </div>
                
            </div>
        </div>

    )
}