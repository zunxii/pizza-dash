import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: 'small' | 'medium';
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, size = 'medium' }) => {
  const sizeClasses = size === 'small' ? 'w-3 h-3' : 'w-3 h-3 sm:w-4 sm:h-4';
  
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses} ${
            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-1 text-xs sm:text-sm text-gray-600">{rating}.0</span>
    </div>
  );
};
