import '../CSS/Loader.css';

export default function Loader() {
    return (
        <>
            <div className="overlay" role="status" aria-live="polite" aria-label="Loading">
                <div className="spinner" />
                <div className="overlayText">Please wait…</div>
            </div>

        </>
    )
}