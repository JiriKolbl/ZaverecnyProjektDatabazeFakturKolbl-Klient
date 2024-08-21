export function Loading() {
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 flex-column">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
            </div>
            <br />
            <p>Načítám</p>
        </div>
    );
}