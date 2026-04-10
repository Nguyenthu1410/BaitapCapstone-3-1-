import React from "react";
import APP_CONFIG from "../../../config/appConfig";
import { Link, NavLink, useNavigate } from "react-router";
import { Button, Divider, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LOCAL_STORAGE_KEYS, PUBLIC_PATH } from "../../../constant";
import { authActions } from "../../../store/auth.slice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((s) => s.auth.userInfo);
  console.log({ userInfo });

  return (
    <header
      className="shadow bg-slate-950"
      style={{ minHeight: APP_CONFIG.HEADER_HEIGHT }}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <h1 className="text-4xl text-white font-semibold pl-8">
          <p className="text-3xl font-black text-white flex gap-2">
            <span className="text-orange-500">MOVIE</span>STARS
          </p>
        </h1>
        <nav className="space-x-5 text-white">
          <NavLink to={PUBLIC_PATH.HOME}>Trang chủ</NavLink>
          <NavLink to={PUBLIC_PATH.SCHEDULE}>Lịch Chiếu</NavLink>
          <NavLink to={PUBLIC_PATH.CINEMA}>Rạp Chiếu</NavLink>
          <NavLink to={PUBLIC_PATH.PROMOTION}>Khuyến Mãi</NavLink>
          <NavLink to={PUBLIC_PATH.APP}>Ứng Dụng</NavLink>
          <NavLink to={PUBLIC_PATH.SUPPORT}>Hỗ Trợ</NavLink>
        </nav>
        {!userInfo ? (
          <div className="space-x-4 p-5">
            <Button
              color="red"
              variant="solid"
              onClick={() => navigate(PUBLIC_PATH.SIGN_IN)}
            >
              Đăng Nhập
            </Button>
            <Button
              color="red"
              variant="outlined"
              onClick={() => navigate(PUBLIC_PATH.REGISTER)}
            >
              Đăng Ký
            </Button>
          </div>
        ) : (
          <Popover
            trigger="click"
            content={
              <div>
                <div className="flex flex-col gap-1">
                  <Button>Thông tin cá nhân</Button>
                </div>
                <Divider />
                <Button
                  danger
                  className="w-full"
                  onClick={() => {
                    dispatch(authActions.clearCredentials());

                    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_INFO);
                    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

                    navigate(PUBLIC_PATH.HOME);
                  }}
                >
                  Đăng xuất
                </Button>
              </div>
            }
          >
            <div>Hi, {userInfo.hoTen}</div>
          </Popover>
        )}
      </div>
    </header>
  );
};

export default Header;
