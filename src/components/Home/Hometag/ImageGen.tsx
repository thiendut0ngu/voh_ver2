import React, { useEffect, useState, ChangeEvent } from 'react';
import { Button } from 'antd';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

interface ItemData {
  img: string;
  title: string;
  author: string;
}

const baseUrl = `//${window.location.hostname}:5000`;

interface ChatGPTProps {
  themeClassName: string;
}

const ChatGPT: React.FC<ChatGPTProps> = ({ themeClassName }) => {
  const [itemData, setItemData] = useState<ItemData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/imagesList'); // Replace with the actual endpoint URL
      const data = await response.json();
      setItemData(data);
    };

    fetchData();
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredItemData = itemData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm) // Filter by title, case-insensitive
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search Images"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ImageList sx={{ height: 900 }}>
        {filteredItemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.author}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default ChatGPT;