import {useState, useEffect} from 'react';
import Ockito from '../../services/ockito';

export function Gist({gist : {created_at, description, files, owner, id, url, html_url}}){
    const ockito = new Ockito();
    const [comments, setComments] = useState([]);

    useEffect(() => {    
        ockito.getGistComments(id).then(comments => {
            setComments(comments);
            return () => {}
        }).catch(()=>{
            setComments([]);
        })
    }, []);

    return (
        <div>
            <div style={{display:'flex', width:"100%"}}>
                <div>
                    <h3>{description}</h3>
                    <p>{`Created at ${created_at} by`} <a href={owner.url}>{owner.login}</a></p>
                    <p></p>
                </div>
                <div>
                    <img height={50} width={50} alt="" src={owner.avatar_url} title=""/>
                </div>
            </div>
            <h3>Files</h3>
            <div>                
                {Object.keys(files).map((file,idx)=>{
                    // TODO: find a way of embedding a gist code - iframe did not work easily
                    // <p>{files[file].raw_url}</p> 
                    return (
                        <div key={idx}>                            
                            <a key={files[file].filename} href={files[file].raw_url}>{files[file].filename}</a>
                            {/* <iframe src={fileSource} title=""/> */}
                        </div>
                    )
                })}
            </div>
            <h3>Comments</h3>
            {comments.length > 0 &&
                <div>                
                    {comments.map(comment =>{
                        return (
                            <div>
                                <p>by {comment.user.login}</p>
                                <p>{comment.body}</p>
                            </div>
                        )
                    })}
                </div>
            }
            {comments.length === 0 &&
                <p style={{fontSize: 12}}>No comments available</p>
            }

        </div>

    )
}