import React, { useEffect, useState } from 'react';
import { Button, Flex } from 'antd';
import './HomeContent.css'
import { UserOutlined, AreaChartOutlined, PictureOutlined, FileExcelOutlined, TeamOutlined, MessageOutlined, FolderViewOutlined} from '@ant-design/icons'

interface ChatGPTProps {
  themeClassName: string;
  onClick: (key: string) => void;
}

const HomeContent: React.FC<ChatGPTProps> = ({ themeClassName, onClick }) => {
  let buttonType: "default" | "primary" = "primary";

  const [sizeChar, setSizeChar] = useState({ sizeHeader: 0, sizeWord: 0, sizeImage: 0, sizeMargin: 0, sizeButton:0, gap: ""});

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 600) {
        setSizeChar({ sizeHeader: 9, sizeWord:  7, sizeImage: 1.0, sizeMargin: 10, sizeButton:190, gap: "small"});
      }
      else if (window.innerWidth >= 600){
        setSizeChar({ sizeHeader: 18, sizeWord:  14, sizeImage: 2.0, sizeMargin: 20, sizeButton:350, gap: "large"});
      }
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  if (themeClassName === "dark-theme") {
    buttonType = "primary";
  } else if (themeClassName === "light-theme") {
    buttonType = "default";
  }

  let role = localStorage.getItem('role')

  return (
        <Flex gap={sizeChar.gap} vertical justify='center' align='center' style={{height:'100%'}}>
          <Button type={buttonType} block size={'large'} onClick={() => {onClick("/bantin")} } style={{width:sizeChar.sizeButton}}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FileExcelOutlined style={{ marginRight: sizeChar.sizeMargin, transform: `scale(${sizeChar.sizeImage})` }} />
              <div>
                <div style={{ fontSize: sizeChar.sizeHeader}}>Bản tin</div>
              </div>
            </div>
          </Button>

          <Button type={buttonType} block size={'large'} onClick={() => {onClick("/thongke")} } style={{width:sizeChar.sizeButton}}> 
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <AreaChartOutlined style={{ marginRight: sizeChar.sizeMargin, transform: `scale(${sizeChar.sizeImage})` }} />
              <div>
                <div style={{ fontSize: sizeChar.sizeHeader }}>Thống kê</div>
              </div>  
            </div>
          </Button>

          <Button type={buttonType} block size={'large'} onClick={() => {onClick("/hinhanh")} }  style={{width:sizeChar.sizeButton}}> 
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <PictureOutlined style={{ marginRight: sizeChar.sizeMargin, transform: `scale(${sizeChar.sizeImage})` }} />
              <div>
                <div style={{ fontSize: sizeChar.sizeHeader}}>Hình ảnh giao thông</div>
              </div>
            </div>
          </Button>

          <Button type={buttonType} block size={'large'} onClick={() => {onClick("/chatGPT")} }  style={{width:sizeChar.sizeButton}}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <MessageOutlined style={{ marginRight: sizeChar.sizeMargin, transform: `scale(${sizeChar.sizeImage})` }} />
              <div>
                <div style={{ fontSize: sizeChar.sizeHeader }}>Chat với VOH ChatGPT</div>
              </div>
            </div>
          </Button>

          <Button type={buttonType} block size={'large'} onClick={() => {onClick("/baocaogiaothong")} }   style={{width:sizeChar.sizeButton}}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FolderViewOutlined style={{ marginRight: sizeChar.sizeMargin, transform: `scale(${sizeChar.sizeImage})` }} />
              <div>
                <div style={{ fontSize: sizeChar.sizeHeader }}>Báo cáo giao thông</div>
              </div>
            </div>
          </Button>
        
        {
          role == 'ROLE_ADMIN'?
          <div style = {{display: 'flex', flexDirection: 'column'}}>
            <div style={{ fontSize: sizeChar.sizeHeader, textAlign: 'center'}}>- Dữ liệu admin -</div>
            <Button type={buttonType} block size={'large'} onClick={() => {onClick("/dulieuadmin")} }  style={{width:sizeChar.sizeButton, margin: 8}}> 
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TeamOutlined style={{ marginRight: sizeChar.sizeMargin, transform: `scale(${sizeChar.sizeImage})` }} />
                <div>  
                  <div style={{ fontSize: sizeChar.sizeHeader }}>Dữ liệu admin</div>
                </div>   
              </div>
            </Button>
          </div>
          : null
        } 


        </Flex>
      // </Flex>
    // </div>
    
  )
}

export default HomeContent