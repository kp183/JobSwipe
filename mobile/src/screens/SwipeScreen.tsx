import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Job } from 'jobswipe-shared/src/types';
import JobCard from '../components/JobCard';
import { jobService } from '../services/jobService';
import { swipeService } from '../services/swipeService';

const { width, height } = Dimensions.get('window');

export default function SwipeScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const response = await jobService.getRecommendedJobs();
      setJobs(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = async (direction: 'left' | 'right', jobId: string) => {
    try {
      await swipeService.swipeJob(jobId, direction);
      
      if (direction === 'right') {
        // Show match animation or apply automatically
        Alert.alert(
          'Applied!',
          'Your AI-generated resume has been sent to the company.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to process swipe');
    }
  };

  const handleManualSwipe = (direction: 'left' | 'right') => {
    if (jobs[currentIndex]) {
      handleSwipe(direction, jobs[currentIndex].id);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading jobs...</Text>
      </View>
    );
  }

  if (jobs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="work-off" size={80} color="#ccc" />
        <Text style={styles.emptyText}>No more jobs to show</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={loadJobs}>
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Jobs</Text>
        <Text style={styles.headerSubtitle}>
          {jobs.length - currentIndex} jobs remaining
        </Text>
      </View>

      <View style={styles.swiperContainer}>
        <Swiper
          cards={jobs}
          renderCard={(job) => <JobCard job={job} />}
          onSwipedLeft={(cardIndex) => handleSwipe('left', jobs[cardIndex].id)}
          onSwipedRight={(cardIndex) => handleSwipe('right', jobs[cardIndex].id)}
          onSwipedAll={() => {
            Alert.alert('All done!', 'Check back later for more jobs.');
          }}
          cardIndex={currentIndex}
          backgroundColor="transparent"
          stackSize={3}
          stackSeparation={15}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
          overlayLabels={{
            left: {
              title: 'PASS',
              style: {
                label: {
                  backgroundColor: '#ff4458',
                  borderColor: '#ff4458',
                  color: 'white',
                  borderWidth: 1,
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            right: {
              title: 'APPLY',
              style: {
                label: {
                  backgroundColor: '#4ade80',
                  borderColor: '#4ade80',
                  color: 'white',
                  borderWidth: 1,
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30,
                },
              },
            },
          }}
        />
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.passButton]}
          onPress={() => handleManualSwipe('left')}
        >
          <Icon name="close" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.applyButton]}
          onPress={() => handleManualSwipe('right')}
        >
          <Icon name="favorite" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  swiperContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 60,
    paddingVertical: 30,
    backgroundColor: 'white',
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  passButton: {
    backgroundColor: '#ff4458',
  },
  applyButton: {
    backgroundColor: '#4ade80',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#64748b',
    marginTop: 20,
    textAlign: 'center',
  },
  refreshButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});