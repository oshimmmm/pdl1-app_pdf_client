import React, { useState } from 'react';

const SearchApp = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);  // 検索が実行されたかどうかを追跡

  const handleSearch = async () => {

    setHasSearched(false);  // 新しい検索を開始するたびにリセット
    setImages([]);  // 検索中の表示をクリア

    const response = await fetch('http://localhost:5000/api/search', {
      method: 'POST', //POSTリクエストを上の5000ポートの/api/searchというエンドポイントに送信
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }), //送信するデータ（query）はJSON形式にする
    });
    const data = await response.json(); //feachに対して帰ってきたresponseをdataに格納
    setHasSearched(true);  // 検索が実行されたらtrueにする

    if (data.images) {
      setImages(data.images);
    } else {
      setImages([]);  // 画像が見つからない場合
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={query}  //入力された内容をqueryとする
        onChange={(e) => setQuery(e.target.value)}  //onChangeイベントでリアルタイムにsetQuery関数を呼び出してqueryに保存する。（ユーザーの入力内容がReactの状態として保持される）
        placeholder="単語を入力してください" 
      />
      <button onClick={handleSearch}>検索</button>
      <div>
        {images.length > 0 ? (
          images.map((image, index) => (
            <img key={index} src={`data:image/png;base64,${image}`} alt="PDF page" />
          ))
        ) : (
          hasSearched && <p>画像が見つかりませんでした</p>  // 検索後にのみ表示
        )}
      </div>
    </div>
  );
};

export default SearchApp;