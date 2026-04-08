import React from "react";
import APP_CONFIG from "../../../config/appConfig";
import { Link, NavLink, useNavigate } from "react-router";
import { Button } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { LOCAL_STORAGE_KEYS, PUBLIC_PATH } from "../../../constant";


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector()
  return (
    <div>
      <header
        className="shadow"
        style={{ minHeight: APP_CONFIG.HEADER_HEIGHT }}
      >
        <div className="container mx-auto flex flex-wrap items-center justify-between h-full gap-4">
          <h1 className="text-4xl font-bold p-5">
            <Link to={PUBLIC_PATH.HOME}>Movie</Link>
          </h1>

          <nav>
            <NavLink to={PUBLIC_PATH.SHCDULE}>Lịch chiếu</NavLink>
            <NavLink to={PUBLIC_PATH.CINEMA}>Rạp chiếu</NavLink>
            <NavLink to={PUBLIC_PATH.PROMOTION}>Khuyến mãi</NavLink>
            <NavLink to={PUBLIC_PATH.SUPPORT}>Hỗ trợ</NavLink>
          </nav>

          <div className="flex items-center gap-4 p-5">
            {userInfo ? (
              <>
                <NavLink
                  to={LOCAL_STORAGE_KEYS.USER_PROFILE}
                  className="rounded-full border border-slate-300 px-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Hồ sơ
                </NavLink>

                <span>
                  Xin chào,{" "}
                  {userInfo.hoTen ||
                    userInfo.taiKhoan}
                </span>

                <Button color="red" variant="solid" onclick="{handleLogout}">
                  Đăng xuất
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="blue"
                  variant="solid"
                  onClick={() => navigate(PUBLIC_PATH.SIGN_IN)}
                >
                  Đăng nhập
                </Button>

                <Button
                  color="blue"
                  variant="solid"
                  onClick={() => navigate(PUBLIC_PATH.REGISTER)}
                >
                  Đăng kí
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
