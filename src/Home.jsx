import React, {useState, useEffect} from "react"
import './HomeStyle.css'

export const Home = (props) => {
    const [url, setUrl] = useState('');
    const [urls, setUrls] = useState([]);
    const token = sessionStorage.getItem("user-data");
    
    const uriUrl = "https://localhost:7269/api/url";

    async function updateTable(){
        const newUrls = await fetch(`${uriUrl}/all`, {
            method: 'GET',
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    'Authorization': 'Bearer ' + token
                }
        }).then(data => data.json())
          .then(data => { setUrls(data)})
          .catch(error => alert(error));
    }
    useEffect(() => {
      updateTable();
    }, [])

    async function handleGenerateClick(){
        if (url === '') alert('Url field is required.');
        else{
          const newUrl = {
            originalUrl: url,
            urlCode: ''
          };
          await fetch(uriUrl, {
            method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(newUrl)
        }).then(data => data.json())
          .then(data => { setUrl(data.shorterUrl) })
          .catch(error => alert(error))
          .finally(() => updateTable());
        }
    }

    async function handleDeleteClick(id){
        await fetch(`${uriUrl}/${id}`, {
            method: 'DELETE',
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    'Authorization': 'Bearer ' + token
                }
        }).catch(error => alert(error))
          .finally(() => updateTable());
    }
    return {updateTable} && (
      <>
      <div className="container">
      <div className="input-section">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input-field"
          placeholder="Enter URL..."
        />
        <button onClick={handleGenerateClick} className="generate-button">
          Generate
        </button>
      </div>
      <table className="item-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Author</th>
            <th>Creation Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {urls.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.originalUrl}</td>
              <td>{item.shorterUrl}</td>
              <td>{item.userId}</td>
              <td>{item.creationDate}</td>
              <td>
                <button className="delete-button" onClick={() => handleDeleteClick(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </>
    )
}