import React from "react";

const LoginButton = () => {
    return (
        <>
            <style>{`
        .box-button {
          color: black;
          text-decoration: none;
          cursor: pointer;
          outline: none;
          border: none;
          background-color: #00C2B0FF;
          border-radius:10px
        }

        .box-span {
          width: 170px;
          height: auto;
          float: left;
          transition: 0.5s linear;
          position: relative;
          display: block;
          overflow: hidden;
          padding: 15px;
          text-align: center;
          border-radius:10px
          background: transparent;
          text-transform: uppercase;
          font-weight: 600;
        }

        .box-span::before {
          position: absolute;
          content: "";
          left: 0;
          bottom: 0;
          height: 4px;
          width: 100%;
          border-bottom: 4px solid transparent;
          border-left: 4px solid transparent;
          box-sizing: border-box;
          transform: translateX(100%);
        }

        .box-span::after {
          position: absolute;
          content: "";
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          border-top: 4px solid transparent;
          border-right: 4px solid transparent;
          box-sizing: border-box;
          transform: translateX(-100%);
        }

        .box-span:hover {
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        }

        .box-span:hover::before {
          border-color: #262626;
          height: 100%;
          width: 100%;
          transform: translateX(0);
          transition: 0.3s transform linear, 0.3s height linear 0.3s;
        }

        .box-span:hover::after {
          border-color: #262626;
          height: 100%;
          width: 100%;
          transform: translateX(0);
          transition: 0.3s transform linear, 0.3s height linear 0.5s;
        }
      `}</style>

            <button className="box-button">
                <span className="box-span">Login</span>
            </button>
        </>
    );
};

export default LoginButton;