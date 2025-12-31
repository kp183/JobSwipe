import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const mockApplications = [
  {
    id: '1',
    jobTitle: 'Senior React Developer',
    company: 'TechCorp Inc.',
    status: 'Under Review',
    appliedDate: '2 days ago',
    statusColor: '#f59e0b',
  },
  {
    id: '2',
    jobTitle: 'Full Stack Engineer',
    company: 'StartupXYZ',
    status: 'Interview Scheduled',
    appliedDate: '1 week ago',
    statusColor: '#22c55e',
  },
  {
    id: '3',
    jobTitle: 'Frontend Developer',
    company: 'DesignStudio Pro',
    status: 'Rejected',
    appliedDate: '2 weeks ago',
    statusColor: '#ef4444',
  },
];

export default function ApplicationsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Applications</Text>
        <Text style={styles.subtitle}>{mockApplications.length} total applications</Text>
      </View>

      <View style={styles.applicationsContainer}>
        {mockApplications.map((application) => (
          <View key={application.id} style={styles.applicationCard}>
            <View style={styles.applicationHeader}>
              <View style={styles.jobInfo}>
                <Text style={styles.jobTitle}>{application.jobTitle}</Text>
                <Text style={styles.companyName}>{application.company}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: application.statusColor }]}>
                <Text style={styles.statusText}>{application.status}</Text>
              </View>
            </View>
            <View style={styles.applicationFooter}>
              <View style={styles.dateContainer}>
                <Icon name="schedule" size={16} color="#64748b" />
                <Text style={styles.dateText}>Applied {application.appliedDate}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {mockApplications.length === 0 && (
        <View style={styles.emptyState}>
          <Icon name="work-off" size={64} color="#d1d5db" />
          <Text style={styles.emptyTitle}>No applications yet</Text>
          <Text style={styles.emptySubtitle}>
            Start swiping to find your perfect job!
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: 'white',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  applicationsContainer: {
    padding: 20,
  },
  applicationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  applicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    color: '#64748b',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  applicationFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 6,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
});