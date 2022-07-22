import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface HealthCheckIconProps {
    healthCheckRating: number;
}

const HealthCheckIcon = (healthCheckRating: HealthCheckIconProps) => {
    switch (healthCheckRating.healthCheckRating) {
        case 0:
            return (
                <>
                    <span>Healthy </span>
                    <FavoriteIcon />
                </>
            );
        case 1:
            return (
                <>
                    <span>Low risk </span>
                    <FavoriteIcon />
                </>
            );
        case 2:
            return (
                <>
                    <span>High risk </span>
                    <HeartBrokenIcon />
                </>
            );
        case 3:
            return (
                <>
                    <span>Critical risk </span>
                    <HeartBrokenIcon />
                </>
            );
        default:
            return <p>Wrong healthCheckRating</p>;
    }
};


export default HealthCheckIcon;