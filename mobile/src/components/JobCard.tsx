import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

interface Job {
  id: string;
  title: string;
  company: {
    name: string;
    logo?: string;
  };
  location?: string;
  remote: boolean;
  type: string;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  skills: string[];
  description: string;
  requirements: string[];
  matchScore?: number;
}

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'Salary not specified';
    if (min && max) {
      return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    }
    return min ? `$${min.toLocaleString()}+` : `Up to $${max?.toLocaleString()}`;
  };

  const getMatchColor = (score?: number) => {
    if (!score) return '#64748b';
    if (score >= 90) return '#22c55e';
    if (score >= 75) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.companyInfo}>
          <View style={styles.companyLogo}>
            <Icon name="business" size={24} color="white" />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.jobTitle} numberOfLines={2}>
              {job.title}
            </Text>
            <Text style={styles.companyName}>{job.company.name}</Text>
          </View>
        </View>
        {job.matchScore && (
          <View style={styles.matchContainer}>
            <Text style={[styles.matchScore, { color: getMatchColor(job.matchScore) }]}>
              {job.matchScore}%
            </Text>
            <Text style={styles.matchLabel}>Match</Text>
          </View>
        )}
      </View>

      {/* Job Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Icon name="location-on" size={16} color="#64748b" />
          <Text style={styles.detailText}>
            {job.remote ? 'Remote' : job.location || 'Location not specified'}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="attach-money" size={16} color="#64748b" />
          <Text style={styles.detailText}>
            {formatSalary(job.salaryMin, job.salaryMax)}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="schedule" size={16} color="#64748b" />
          <Text style={styles.detailText}>
            {job.type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
          </Text>
        </View>
      </View>

      {/* Skills */}
      <View style={styles.skillsContainer}>
        <Text style={styles.skillsTitle}>Required Skills</Text>
        <View style={styles.skillsWrapper}>
          {job.skills.slice(0, 6).map((skill, index) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
          {job.skills.length > 6 && (
            <View style={[styles.skillTag, styles.moreSkillsTag]}>
              <Text style={styles.moreSkillsText}>+{job.skills.length - 6}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description} numberOfLines={4}>
          {job.description}
        </Text>
      </View>

      {/* Requirements */}
      <View style={styles.requirementsContainer}>
        <Text style={styles.requirementsTitle}>Key Requirements</Text>
        {job.requirements.slice(0, 3).map((req, index) => (
          <View key={index} style={styles.requirementRow}>
            <View style={styles.bullet} />
            <Text style={styles.requirementText} numberOfLines={2}>
              {req}
            </Text>
          </View>
        ))}
        {job.requirements.length > 3 && (
          <Text style={styles.moreRequirements}>
            +{job.requirements.length - 3} more requirements
          </Text>
        )}
      </View>

      {/* Swipe Hint */}
      <View style={styles.swipeHint}>
        <Text style={styles.swipeHintText}>
          ← Swipe left to pass • Swipe right to apply →
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width - 40,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  companyInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  companyLogo: {
    width: 48,
    height: 48,
    backgroundColor: '#6366f1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    color: '#64748b',
  },
  matchContainer: {
    alignItems: 'center',
  },
  matchScore: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  matchLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 8,
  },
  skillsContainer: {
    marginBottom: 16,
  },
  skillsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  skillsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: '#eef2ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  skillText: {
    fontSize: 12,
    color: '#6366f1',
    fontWeight: '500',
  },
  moreSkillsTag: {
    backgroundColor: '#f1f5f9',
  },
  moreSkillsText: {
    fontSize: 12,
    color: '#64748b',
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  requirementsContainer: {
    marginBottom: 16,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bullet: {
    width: 6,
    height: 6,
    backgroundColor: '#6366f1',
    borderRadius: 3,
    marginTop: 6,
    marginRight: 8,
  },
  requirementText: {
    fontSize: 14,
    color: '#64748b',
    flex: 1,
  },
  moreRequirements: {
    fontSize: 12,
    color: '#9ca3af',
    fontStyle: 'italic',
    marginTop: 4,
  },
  swipeHint: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 12,
    alignItems: 'center',
  },
  swipeHintText: {
    fontSize: 12,
    color: '#9ca3af',
  },
});