"use client"

import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Chip, 
  Button, 
  Box, 
  Typography,
  styled 
} from '@mui/material';
import { themeColors } from "../ui/color-selector";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.3s ease',
  backgroundColor: theme.palette.background.paper,
  border: '1px solid',
  borderColor: theme.palette.divider,
  '&:hover': {
    transform: 'translateY(-5px) scale(1.01)',
    boxShadow: theme.shadows[6]
  }
}));

const GradientOverlay = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '50%',
  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)'
});

export default function ProjectCard({ project, themeColor = "blue" }) {
  const colors = themeColors[themeColor] || themeColors.blue;

  return (
    <StyledCard>
      <Box sx={{ position: 'relative', height: 200 }}>
        <CardMedia
          component="img"
          image={project.image || "/placeholder.svg"}
          alt={project.title}
          sx={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        />
        <GradientOverlay />
        <Box sx={{ 
          position: 'absolute', 
          bottom: 16, 
          left: 16,
          right: 16 
        }}>
          <Typography 
            variant="h6" 
            component="h3"
            sx={{ 
              color: 'common.white', 
              fontWeight: 'bold',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            {project.title}
          </Typography>
          {project.category && (
            <Chip
              label={project.category}
              size="small"
              sx={{ 
                mt: 1,
                color: 'common.white',
                backgroundColor: colors.secondary,
                opacity: 0.8
              }}
            />
          )}
        </Box>
      </Box>

      <CardContent>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {project.description}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {project.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{ 
                borderColor: colors.secondary,
                color: colors.secondary,
                '&:hover': {
                  backgroundColor: `${colors.secondary}20`
                }
              }}
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            size="small"
            sx={{ 
              flex: 1,
              borderWidth: 2,
              borderColor: colors.border,
              color: colors.accent,
              '&:hover': {
                borderColor: colors.border,
                borderOpacity: 0.8
              }
            }}
          >
            View Details
          </Button>
          
          {project.githubUrl && (
            <Button
              size="small"
              sx={{ 
                backgroundColor: 'action.hover',
                color: 'text.primary',
                minWidth: 'auto',
                '&:hover': {
                  backgroundColor: colors.hover
                }
              }}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={16} />
            </Button>
          )}
          
          {project.liveUrl && (
            <Button
              size="small"
              sx={{ 
                backgroundColor: 'action.hover',
                color: 'text.primary',
                minWidth: 'auto',
                '&:hover': {
                  backgroundColor: colors.hover
                }
              }}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiExternalLink size={16} />
            </Button>
          )}
        </Box>
      </CardContent>
    </StyledCard>
  );
}