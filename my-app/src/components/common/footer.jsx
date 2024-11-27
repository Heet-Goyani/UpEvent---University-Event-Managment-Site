import React from "react";

// styles
import '../../styles/common/footer.scss';

const Footer = () => {
    const [email, setEmail] = React.useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        console.log(email);
    };

    return (
        <div id="footer">
            <span className="p1" style={{ color: '#fff' }}>Up<span className="p2">Event</span></span>
            <form>
                <div className="form-group">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className="btn btn-fill" onClick={handleSubscribe}>Subscribe</button>
                </div>
            </form>
            <div className="list">
                <ul className="ul-box" style={{ listStyleType: 'none' }}>
                <li><a href='#'>Home</a></li>
                <li><a href='#'>About</a></li>
                <li><a href='#'>Get in touch</a></li>
                <li><a href='#'>FAQS</a></li>
                </ul>
            </div>
            <div className="footer-bottom">
                <div className="list">
                    <ul className="ul-box" style={{ listStyleType: 'none' }}>
                        <li><a><i className="bi bi-linkedin icon"></i></a></li>
                        <li><a><i className="bi bi-instagram icon"></i></a></li>
                        <li><a><i className="bi bi-facebook icon"></i></a></li>
                    </ul>
                </div>
                <div className="copyright">Copyright © 2024 UpEvent. All rights reserved.</div>
            </div>
        </div>
    );
}
export default Footer;
