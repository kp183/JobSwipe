import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [emailUpdates, setEmailUpdates] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Text style={styles.settingDescription}>
              Get notified about new job matches
            </Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#d1d5db', true: '#6366f1' }}
            thumbColor={notificationsEnabled ? '#ffffff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Email Updates</Text>
            <Text style={styles.settingDescription}>
              Receive weekly job recommendations via email
            </Text>
          </View>
          <Switch
            value={emailUpdates}
            onValueChange={setEmailUpdates}
            trackColor={{ false: '#d1d5db', true: '#6366f1' }}
            thumbColor={emailUpdates ? '#ffffff' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="location-on" size={24} color="#64748b" />
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemLabel}>Location Preferences</Text>
            <Text style={styles.menuItemDescription}>Update your preferred locations</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#d1d5db" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="attach-money" size={24} color="#64748b" />
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemLabel}>Salary Range</Text>
            <Text style={styles.menuItemDescription}>Set your expected salary range</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#d1d5db" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="work" size={24} color="#64748b" />
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemLabel}>Job Types</Text>
            <Text style={styles.menuItemDescription}>Choose preferred job types</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#d1d5db" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="person" size={24} color="#64748b" />
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemLabel}>Edit Profile</Text>
            <Text style={styles.menuItemDescription}>Update your personal information</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#d1d5db" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="security" size={24} color="#64748b" />
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemLabel}>Privacy & Security</Text>
            <Text style={styles.menuItemDescription}>Manage your privacy settings</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#d1d5db" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="help" size={24} color="#64748b" />
          <View style={styles.menuItemContent}>
            <Text style={styles.menuItemLabel}>Help & Support</Text>
            <Text style={styles.menuItemDescription}>Get help or contact support</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#d1d5db" />
        </TouchableOpacity>
      </View>
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
  },
  section: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  menuItemContent: {
    flex: 1,
    marginLeft: 16,
  },
  menuItemLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 2,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#64748b',
  },
});