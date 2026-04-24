import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import BottomNavBar from './modules/user/components/navigation/BottomNavBar';
import HomePage from './modules/user/pages/Home/HomePage';
import SearchPage from './modules/user/pages/Search/SearchPage';
import SearchHashtagPage from './modules/user/pages/Search/SearchHashtagPage';
import CreatePage from './modules/user/pages/Create/CreatePage';
import InboxPage from './modules/user/pages/Inbox/InboxPage';
import ProfilePage from './modules/user/pages/Profile/ProfilePage';
import SettingsPage from './modules/user/pages/Settings/SettingsPage';
import EditProfilePage from './modules/user/pages/Settings/EditProfilePage';
import PrivacyPage from './modules/user/pages/Settings/PrivacyPage';
import PrivacyCommentsPage from './modules/user/pages/Settings/PrivacyCommentsPage';
import PrivacyMentionsTagsPage from './modules/user/pages/Settings/PrivacyMentionsTagsPage';
import PrivacyDirectMessagesPage from './modules/user/pages/Settings/PrivacyDirectMessagesPage';
import PrivacyDuetPage from './modules/user/pages/Settings/PrivacyDuetPage';
import PrivacyStitchPage from './modules/user/pages/Settings/PrivacyStitchPage';
import PrivacyDownloadsPage from './modules/user/pages/Settings/PrivacyDownloadsPage';
import BlockedAccountsPage from './modules/user/pages/Settings/BlockedAccountsPage';
import SecurityPage from './modules/user/pages/Settings/SecurityPage';
import SecurityAlertsPage from './modules/user/pages/Settings/SecurityAlertsPage';
import YourDevicesPage from './modules/user/pages/Settings/YourDevicesPage';
import PasswordPage from './modules/user/pages/Settings/PasswordPage';
import TwoStepVerificationPage from './modules/user/pages/Settings/TwoStepVerificationPage';
import PushNotificationsPage from './modules/user/pages/Settings/PushNotificationsPage';
import LanguagePage from './modules/user/pages/Settings/LanguagePage';
import HelpCenterPage from './modules/user/pages/Settings/HelpCenterPage';
import SafetyCenterPage from './modules/user/pages/Settings/SafetyCenterPage';
import HelpPrivacySecurityPage from './modules/user/pages/Settings/HelpPrivacySecurityPage';
import ReportProblemPage from './modules/user/pages/Settings/ReportProblemPage';
import HelpArticlesPage from './modules/user/pages/Settings/HelpArticlesPage';
import HelpArticleDetailPage from './modules/user/pages/Settings/HelpArticleDetailPage';
import Splash from './modules/user/components/common/Splash';
import AuthPage from './modules/user/pages/Auth/AuthPage';
import OnboardingPage from './modules/user/pages/Auth/components/OnboardingPage';
import SoundPage from './modules/user/pages/Sound/SoundPage';
import FollowersPage from './modules/user/pages/Profile/FollowersPage';
import NewFollowersPage from './modules/user/pages/Inbox/NewFollowersPage';
import AllActivityPage from './modules/user/pages/Inbox/AllActivityPage';
import NewMessagePage from './modules/user/pages/Inbox/NewMessagePage';
import ChatPage from './modules/user/pages/Inbox/ChatPage';
import ChatMediaPage from './modules/user/pages/Inbox/ChatMediaPage';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AdminConfigProvider } from './context/AdminConfigContext';
import AdminLayout from './modules/admin/AdminLayout';
import WebsiteLandingPage from './modules/website/WebsiteLandingPage';

const MainLayout = ({ onLogout }) => {
  const location = useLocation();
  const [showNav, setShowNav] = useState(true);

  // Hide nav on certain pages if needed, and handle theme
  useEffect(() => {
    // Dismiss keyboard on any tab/route change
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    const isUserSubPage = /^\/user\/[^/]+\/followers$/.test(location.pathname);
    const isChatSubPage =
      location.pathname === '/inbox/new-message' ||
      location.pathname.startsWith('/inbox/chat/');
    const isSettingsPage =
      location.pathname === '/settings' ||
      location.pathname.startsWith('/settings/');
    const isSearchDetailPage = location.pathname.startsWith('/search/hashtag/');

    // Hide bottom nav on sub-pages (Sound, User Profile sub-pages, Inbox sub-pages)
    const isSubPage = 
      location.pathname.includes('/sound/') || 
      location.pathname === '/create' ||
      isUserSubPage || 
      isSettingsPage ||
      isSearchDetailPage ||
      isChatSubPage ||
      location.pathname === '/inbox/new-followers' || 
      location.pathname === '/inbox/activity';
    
    setShowNav(!isSubPage);
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/user" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/hashtag/:tagSlug" element={<SearchHashtagPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/inbox/new-followers" element={<NewFollowersPage />} />
        <Route path="/inbox/activity" element={<AllActivityPage />} />
        <Route path="/inbox/new-message" element={<NewMessagePage />} />
        <Route path="/inbox/chat/:username" element={<ChatPage />} />
        <Route path="/inbox/chat/:username/gallery" element={<ChatMediaPage mode="gallery" />} />
        <Route path="/inbox/chat/:username/camera" element={<ChatMediaPage mode="camera" />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage onLogout={onLogout} />} />
        <Route path="/settings/edit-profile" element={<EditProfilePage />} />
        <Route path="/settings/privacy" element={<PrivacyPage />} />
        <Route path="/settings/privacy/comments" element={<PrivacyCommentsPage />} />
        <Route path="/settings/privacy/mentions-tags" element={<PrivacyMentionsTagsPage />} />
        <Route path="/settings/privacy/direct-messages" element={<PrivacyDirectMessagesPage />} />
        <Route path="/settings/privacy/duet" element={<PrivacyDuetPage />} />
        <Route path="/settings/privacy/stitch" element={<PrivacyStitchPage />} />
        <Route path="/settings/privacy/downloads" element={<PrivacyDownloadsPage />} />
        <Route path="/settings/privacy/blocked-accounts" element={<BlockedAccountsPage />} />
        <Route path="/settings/security" element={<SecurityPage />} />
        <Route path="/settings/security/alerts" element={<SecurityAlertsPage />} />
        <Route path="/settings/security/devices" element={<YourDevicesPage />} />
        <Route path="/settings/security/password" element={<PasswordPage />} />
        <Route path="/settings/security/two-step-verification" element={<TwoStepVerificationPage />} />
        <Route path="/settings/push-notifications" element={<PushNotificationsPage />} />
        <Route path="/settings/language" element={<LanguagePage />} />
        <Route path="/settings/help-center" element={<HelpCenterPage />} />
        <Route path="/settings/help-center/safety-center" element={<SafetyCenterPage />} />
        <Route path="/settings/help-center/privacy-security" element={<HelpPrivacySecurityPage />} />
        <Route path="/settings/help-center/report-problem" element={<ReportProblemPage />} />
        <Route path="/settings/help-center/articles" element={<HelpArticlesPage />} />
        <Route path="/settings/help-center/articles/:articleSlug" element={<HelpArticleDetailPage />} />
        <Route path="/sound/:musicName" element={<SoundPage />} />
        <Route path="/user/:username" element={<ProfilePage />} />
        <Route path="/user/:username/followers" element={<FollowersPage />} />
      </Routes>
      {showNav && <BottomNavBar isDarkTheme={location.pathname !== '/'} />}
    </>
  );
};


const AppContent = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [appState, setAppState] = useState('launch'); // launch, auth, onboarding, main

    useEffect(() => {
        const isAdminRoute = location.pathname.startsWith('/admin');
        document.body.classList.toggle('app-admin-route', isAdminRoute);

        return () => {
          document.body.classList.remove('app-admin-route');
        };
    }, [location.pathname]);

    useEffect(() => {
        if (appState === 'launch') {
            const timer = setTimeout(() => {
                // Hamesha 'main' state mein jao - reload pe page wahi rahega jahan tha
                setAppState('main');
            }, 1800); 
            return () => clearTimeout(timer);
        }
    }, [appState]);

    const handleAuthComplete = () => {
        setAppState('onboarding');
    };

    const handleOnboardingComplete = () => {
        setAppState('main');
        navigate('/user', { replace: true });
    };

    const handleLogout = () => {
        // Logout ke baad /user page pe le jao
        navigate('/user', { replace: true });
    };

    return (
        <div className={`theme-app-shell relative w-full max-w-full h-full min-h-full mx-auto flex flex-col overflow-hidden shadow-2xl ${theme === 'light' ? 'theme-is-light' : 'theme-is-dark'}`}>
            {appState === 'launch' && <Splash />}
            {appState !== 'launch' && (
                <Routes>
                    {appState === 'onboarding' ? (
                        <Route path="/*" element={<OnboardingPage onComplete={handleOnboardingComplete} />} />
                    ) : (
                        <>
                          <Route path="/admin/*" element={<AdminLayout />} />
                          <Route path="/" element={<WebsiteLandingPage />} />
                          <Route path="/website/*" element={<WebsiteLandingPage />} />
                          <Route path="/welcome" element={<AuthPage onComplete={handleAuthComplete} initialMode="signup" />} />
                          <Route path="/login" element={<AuthPage onComplete={handleAuthComplete} initialMode="login" />} />
                          <Route path="/signup" element={<AuthPage onComplete={handleAuthComplete} initialMode="signup" />} />
                          <Route path="/*" element={<MainLayout onLogout={handleLogout} />} />
                        </>
                    )}
                </Routes>
            )}
        </div>
    );
}

function App() {
  return (
    <Router>
        <ThemeProvider>
          <AdminConfigProvider>
            <AppContent />
          </AdminConfigProvider>
        </ThemeProvider>
    </Router>
  );
}

export default App;
