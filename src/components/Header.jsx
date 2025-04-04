import SearchBar from "../searchBar/SearchBar";

export default function Header() {
    return (
        <>
            <header className="bg-dark text-white py-3">
                <div className="container d-flex align-items-center justify-content-between">
                    <h1 className="h3 mb-0">Boolflix</h1>
                    <SearchBar />
                    <button className="btn btn-outline-light">Login</button>
                </div>
            </header>
        </>
    );
}