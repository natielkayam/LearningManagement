import { 
  Container, 
  Typography, 
  Button,
  Paper,
  Grid,
} from '@mui/material';
import { 
  School, 
  People, 
  ArrowForward
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  const handleCourseClick = () => {
    navigate(`/courses`);
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ px: 4, py: 8 }}>
        {/* Header */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 6, 
            mb: 6, 
            textAlign: 'center',
            backgroundColor: '#1a1a1a',
            borderRadius: 3,
            border: '1px solid #333333'
          }}
        >
          <Typography 
            variant="h2" 
            fontWeight="bold" 
            color="#2196f3" 
            mb={2}
            sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
          >
            Welcome to Learning Management System
          </Typography>
          <Typography 
            variant="h6" 
            color="#b0b0b0"
            sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
          >
            Admin Dashboard - Manage your educational platform
          </Typography>
        </Paper>

        {/* Navigation Cards */}
        <Grid container spacing={6} justifyContent="center">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 5, 
                textAlign: 'center',
                backgroundColor: '#1a1a1a',
                borderRadius: 3,
                border: '1px solid #333333',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(56, 142, 60, 0.2)',
                  border: '1px solid #4caf50'
                }
              }}
              onClick={handleCourseClick}
            >
              <School 
                sx={{ 
                  fontSize: 80, 
                  color: '#4caf50', 
                  mb: 3,
                  filter: 'drop-shadow(0 4px 8px rgba(76, 175, 80, 0.3))'
                }} 
              />
              <Typography 
                variant="h4" 
                fontWeight="bold" 
                color="white" 
                mb={2}
                sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}
              >
                Courses
              </Typography>
              <Typography 
                variant="body1" 
                color="#b0b0b0" 
                mb={4}
                sx={{ 
                  lineHeight: 1.6,
                  fontSize: { xs: '0.9rem', md: '1rem' }
                }}
              >
                Manage courses, enrollments, and assignments
              </Typography>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{ 
                  backgroundColor: 'white',
                  color: '#000',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: 2,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                Go to Courses
              </Button>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 5, 
                textAlign: 'center',
                backgroundColor: '#1a1a1a',
                borderRadius: 3,
                border: '1px solid #333333',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(25, 118, 210, 0.2)',
                  border: '1px solid #2196f3'
                }
              }}
            >
              <People 
                sx={{ 
                  fontSize: 80, 
                  color: '#2196f3', 
                  mb: 3,
                  filter: 'drop-shadow(0 4px 8px rgba(33, 150, 243, 0.3))'
                }} 
              />
              <Typography 
                variant="h4" 
                fontWeight="bold" 
                color="white" 
                mb={2}
                sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}
              >
                Students
              </Typography>
              <Typography 
                variant="body1" 
                color="#b0b0b0" 
                mb={4}
                sx={{ 
                  lineHeight: 1.6,
                  fontSize: { xs: '0.9rem', md: '1rem' }
                }}
              >
                Manage student accounts and profiles
              </Typography>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{ 
                  backgroundColor: 'white',
                  color: '#000',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: 2,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                Comming Soon
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}