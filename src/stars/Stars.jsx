import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function Stars({ vote }) {

    function renderStars(vote) {
        const fullStars = Math.ceil(vote);

        return (
            <>
                {[...Array(fullStars)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="text-warning" />
                ))}
            </>
        );
    }

    return (
        <>
            <p className="card-text">
                <strong>Voto:</strong> {renderStars(Math.floor(vote / 2))}
            </p>
        </>
    )
}