import React from "react";
import fb from '../facebook.png'
import vk from "../vk.png";
const MyFacebookButton = ({ onClick }) => (
    <button type="button" className="btn" onClick={onClick}>
        <img src = {fb} alt = "fb"></img>
    </button>
);
export default MyFacebookButton