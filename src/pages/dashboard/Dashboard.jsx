import React, { useContext } from 'react'
import "./dashboard.scss"
import "./dashboard.css"
import { AddCircleOutlineOutlined, DeleteOutlineOutlined, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { dash, staff } from './dashItemArray';
import { AuthorizationContext } from '../../context/AuthContext';

export default function Dashboard() {
    const { data } = useContext(AuthorizationContext)
    return (
        <div className={data.role === 7575 ? "dashTop" : ''}>
            <div className='dashboard'>
                {data && <>
                    {data.role === 7575 ?
                        <>
                            {staff.map((item) => {
                                console.log("image path: ", item.img)
                                return (
                                    <div className="dashItem1" key={item.title}>
                                        <div className="dashItemTop">
                                            <div className={`dashItemTopImageDiv  ${item.divClassName}`}>
                                                <img className={`dashItemImg  ${item.divClassName}`}
                                                    src={`${item.img}`}
                                                    alt="" />
                                            </div>
                                            <Link to={item.link} className='link'>
                                                <div className="all">see All</div>
                                            </Link>
                                        </div>
                                        <div className="dashItemMid">
                                            <div className="itemTitle">{item.title}</div>
                                            <div className="itemPara">{item.para}</div>
                                        </div>
                                        <div className="dashIcons">
                                            <Link to={item.iconLink} className='link'>
                                                <AddCircleOutlineOutlined className="dashitemIcons" />
                                            </Link>
                                            <Settings className="dashitemIcons" />
                                            <DeleteOutlineOutlined className="dashitemIcons" />
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                        :
                        <>
                            {dash.map((item) => (
                                <div className="dashItem1" key={item.title}>
                                    <div className="dashItemTop">
                                        <div className={`dashItemTopImageDiv  ${item.divClassName}`}>
                                            <img className={`dashItemImg  ${item.divClassName}`}
                                                src={`${item.img}`}
                                                alt="" />
                                        </div>
                                        <Link to={item.link} className='link'>
                                            <div className="all">see All</div>
                                        </Link>
                                    </div>
                                    <div className="dashItemMid">
                                        <div className="itemTitle">{item.title}</div>
                                        <div className="itemPara">{item.para}</div>
                                    </div>
                                    <div className="dashIcons">
                                        <Link to={item.iconLink} className='link'>
                                            <AddCircleOutlineOutlined className="dashitemIcons" />
                                        </Link>
                                        <Settings className="dashitemIcons" />
                                        <DeleteOutlineOutlined className="dashitemIcons" />
                                    </div>
                                </div>
                            ))}
                        </>
                    }
                </>}
            </div>
        </div>
    )
}

