import { Link } from "react-router-dom";
import { FaTasks } from "react-icons/fa";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "linear-gradient(135deg, #715bc9 0%, #684AE2 100%) ", marginLeft: "calc(-50vw + 50%)", width: "100vw",height:"100px", padding: "0" }}>
            <div className="container-fluid ps-4 pe-4">
                <Link
                    className="navbar-brand fw-bold d-flex align-items-center"
                    to="/"
                >
                    <FaTasks style={{ color: "#F8FAFC", marginRight: "0.5rem", marginLeft:"100px",fontSize: "3rem" }} />
                    <span style={{ color: "white", fontSize: "2.5rem" }}>
                        TaskFlow
                    </span>
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarNav"
                >
                    <ul className="navbar-nav me-4">

                        <li className="nav-item">
                            <Link className="nav-link px-3" to="/" style={{fontSize: "1.1rem", fontWeight:"bold"}}>
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link px-3" href="#features" style={{ color: "white" , fontSize: "1.1rem",fontWeight:"bold"}}>
                                Features
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link px-3" href="#about" style={{ color: "white", fontSize: "1.1rem",fontWeight:"bold" }}>
                                About
                            </a>
                        </li>

                    </ul>

                    {/* Buttons */}
                    <div className="d-flex gap-2">
                        <Link
                            to="/login"
                            className="btn btn-outline-light"
                         >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="btn btn-outline-light"
                        >
                            Register
                        </Link>
                    </div>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;