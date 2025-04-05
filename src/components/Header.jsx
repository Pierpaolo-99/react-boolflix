import SearchBar from "../searchBar/SearchBar";
import "./Header.css";

export default function Header() {
    return (
        <>
            <header className="header">
                <div className="container d-flex align-items-center justify-content-between">
                    <h1 className="logo">Boolflix</h1>
                    <nav className="navigation">
                        <ul className="nav-list d-flex">
                            <li className="nav-item"><a href="#" className="nav-link">Home</a></li>
                            <li className="nav-item"><a href="#" className="nav-link">Serie TV</a></li>
                            <li className="nav-item"><a href="#" className="nav-link">Film</a></li>
                        </ul>
                    </nav>
                    <div className="actions d-flex">
                        <SearchBar />
                        <button className="btn btn-outline-light">Login</button>
                    </div>
                </div>
            </header>
        </>
    );
}