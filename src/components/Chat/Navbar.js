import React from 'react';

const staticUser = {
  displayName: 'Hào Quang Rực Rỡ',
  photoURL: 'https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2023/3/22/tran-thanh-1679470577131190955048-53-211-544-1149-crop-16794706034051970895643.jpg'
};

const Navbar = () => {
  return (
    <div className='navbar'>
      <span className="logo">UWC Chat</span>
      <div className="user">
        {/* <img src={staticUser.photoURL} alt="" />
        <span>{staticUser.displayName}</span>
        <button>logout</button> */}
      </div>
    </div>
  );
};

export default Navbar;
