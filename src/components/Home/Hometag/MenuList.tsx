import { Menu } from 'antd'
import { HomeOutlined, AreaChartOutlined, PictureOutlined, FileExcelOutlined, MessageOutlined, TeamOutlined, FolderViewOutlined} from '@ant-design/icons'
import { useLocation } from "react-router-dom"

interface MenuListProps {
    darkTheme: boolean;
    onClick: (key: string) => void;
    collapsed: boolean;
}

const MenuList: React.FC<MenuListProps> = ({ darkTheme, onClick, collapsed }) => {
    const handleMenuClick = (e: any) => {
        onClick(e.key);
    };
    
    const location = useLocation();
    
    const itemStyle: React.CSSProperties = collapsed ? {} : { whiteSpace: 'normal', height: 'auto' };

    let role = localStorage.getItem('role')

    return (
    <Menu theme={ darkTheme ? 'dark' : 'light'} 
        className='menu-bar-home' 
        onClick={handleMenuClick} 
        selectedKeys={[location.pathname]}>

        <Menu.Item key="/trangchu" icon={<HomeOutlined />}>
            Trang chủ
        </Menu.Item>

        <Menu.Item key="/bantin" style={itemStyle} icon={<FileExcelOutlined />}>
            {collapsed ? 'Bản tin' : 'Bản tin'}
        </Menu.Item>

        <Menu.Item key="/thongke" style={itemStyle} icon={<AreaChartOutlined />}>
            {collapsed ? 'Thống kê' : 'Thống kê'}
        </Menu.Item>

        <Menu.Item key="/hinhanh" style={itemStyle} icon={<PictureOutlined />}>
            {collapsed ? 'Hình ảnh giao thông' : 'Hình ảnh'}
        </Menu.Item>

        <Menu.Item key="/chatGPT" icon={<MessageOutlined />}>
            VOH ChatGPT 
        </Menu.Item>

        <Menu.Item key="/baocaogiaothong" icon={<FolderViewOutlined />}>
            Báo cáo giao thông 
        </Menu.Item>

    {
        role == 'ROLE_ADMIN'?
        <Menu.Item key="/dulieuadmin" style={itemStyle} icon={<TeamOutlined />}>
            {collapsed ? 'Dữ liệu admin' : 'Dữ liệu admin'}
        </Menu.Item> : null
        // <div>
        
        // <Menu.Item key="/nguyennhan" style={itemStyle} icon={<FolderViewOutlined />}>
        //     {collapsed ? 'Nguyên nhân' : 'Nguyên nhân'}
        // </Menu.Item>
        // </div> : null
    }
        {/* <Menu.Item key="/wineInfor" style={itemStyle} icon={<CoffeeOutlined />}>
            {collapsed ? ' ' : ' '}
        </Menu.Item> */}

        {/* <Menu.Item key="/demoVideo" style={itemStyle} icon={<YoutubeOutlined />}>
            {collapsed ? ' ' : ' '}
        </Menu.Item> */}
             
    </Menu>
  )
}

export default MenuList