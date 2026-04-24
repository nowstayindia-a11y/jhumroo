import React, { useEffect, useMemo, useState } from 'react';
import {
  BiAt,
  BiCheck,
  BiChevronDown,
  BiChevronLeft,
  BiChevronRight,
  BiImageAlt,
  BiLinkAlt,
  BiMicrophone,
  BiMusic,
  BiPlay,
  BiPlus,
  BiRefresh,
  BiSearch,
  BiSliderAlt,
  BiTrash,
  BiVolumeFull,
  BiWorld,
  BiX,
} from 'react-icons/bi';
import {
  IoCameraReverseOutline,
  IoColorWandOutline,
  IoLocationOutline,
  IoOptionsOutline,
  IoPlaySkipForwardOutline,
  IoSparklesOutline,
  IoTextOutline,
  IoTimerOutline,
  IoVideocamOutline,
} from 'react-icons/io5';
import { FiScissors } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../../context/ThemeContext';
import { useAppContent } from '../../../../hooks/useAppContent';
const SOUND_FAVORITES_KEY = 'soundFavorites';

const createInitialPostState = () => ({
  caption: '',
  audience: 'everyone',
  location: '',
  linkType: '',
  allowComments: true,
  allowDuet: true,
  allowStitch: true,
  highQuality: true,
  saveToDevice: true,
  autoCaptions: true,
  audienceControls: true,
  captionLanguage: 'English',
});

const formatElapsed = (value) => `00:${String(Math.max(0, Math.round(value))).padStart(2, '0')}`;

const readSoundFavorites = () => {
  try {
    const storedValue = localStorage.getItem(SOUND_FAVORITES_KEY);
    const parsedValue = storedValue ? JSON.parse(storedValue) : [];
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
};

const overlayButtonClass =
  'w-9 h-9 rounded-full bg-black/30 border border-white/10 backdrop-blur-md flex items-center justify-center text-white active:opacity-70';

const sheetOverlayClass =
  'absolute inset-0 z-40 bg-black/55 backdrop-blur-[2px] flex items-end justify-center';

const Toggle = ({ enabled, onToggle, isDarkMode = false }) => (
  <button
    type="button"
    onClick={onToggle}
    className={`relative inline-flex h-8 w-[52px] shrink-0 items-center rounded-full border transition-all duration-200 ${
      enabled
        ? isDarkMode
          ? 'border-[#2fd96b]/40 bg-[linear-gradient(180deg,#31df70_0%,#21c45f_100%)] shadow-[0_8px_20px_rgba(33,196,95,0.24)]'
          : 'border-[#2fd96b]/35 bg-[linear-gradient(180deg,#34de73_0%,#25c863_100%)] shadow-[0_8px_18px_rgba(37,200,99,0.18)]'
        : isDarkMode
          ? 'border-white/10 bg-white/10'
          : 'border-black/10 bg-black/10'
    }`}
    aria-pressed={enabled}
  >
    <span
      className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-[0_2px_8px_rgba(15,23,42,0.22)] transition-transform duration-200 ${
        enabled ? 'translate-x-[24px]' : 'translate-x-[2px]'
      }`}
    />
  </button>
);

const BottomSheet = ({ title, onClose, children, compact = false, scrollable = false }) => (
  <div className={sheetOverlayClass} onClick={onClose}>
    <div
      className={`flex w-full max-w-[450px] flex-col overflow-hidden rounded-t-[24px] bg-white text-black shadow-2xl ${
        compact ? 'pb-[max(1rem,env(safe-area-inset-bottom))]' : 'max-h-[78%] pb-[max(1.25rem,env(safe-area-inset-bottom))]'
      }`}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="flex shrink-0 items-center justify-between px-5 pt-4 pb-3">
        <h3 className="text-[17px] font-semibold">{title}</h3>
        <button type="button" onClick={onClose} className="text-black/65 active:opacity-60">
          <BiX size={22} />
        </button>
      </div>
      <div className={scrollable ? 'min-h-0 overflow-y-auto' : ''}>{children}</div>
    </div>
  </div>
);

const CenterModal = ({ title, description, primaryLabel, secondaryLabel, onPrimary, onSecondary, isDarkMode = false }) => (
  <div className={`absolute inset-0 z-40 flex items-center justify-center px-6 ${isDarkMode ? 'bg-black/58' : 'bg-black/45'}`}>
    <div
      className={`w-full max-w-[300px] rounded-[18px] px-5 py-5 text-center shadow-xl ${
        isDarkMode
          ? 'border border-white/10 bg-[#17181c] text-white shadow-[0_24px_48px_rgba(0,0,0,0.45)]'
          : 'bg-white text-black'
      }`}
    >
      <h3 className="text-[18px] font-semibold">{title}</h3>
      <p className={`mt-3 text-[13px] leading-5 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{description}</p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onSecondary}
          className={`rounded-[10px] px-4 py-2.5 text-[14px] font-medium active:opacity-70 ${
            isDarkMode
              ? 'border border-white/10 bg-white/5 text-white/75'
              : 'border border-black/10 text-black/70'
          }`}
        >
          {secondaryLabel}
        </button>
        <button
          type="button"
          onClick={onPrimary}
          className="rounded-[10px] bg-[#fe2c55] px-4 py-2.5 text-[14px] font-semibold text-white active:opacity-80"
        >
          {primaryLabel}
        </button>
      </div>
    </div>
  </div>
);

const getToolIcon = (toolId, size = 22) => {
  switch (toolId) {
    case 'flip':
      return <BiRefresh size={size + 1} />;
    case 'speed':
      return <span className="text-[13px] font-black leading-none tracking-tight">1x</span>;
    case 'timer':
      return (
        <span className="relative flex items-center justify-center">
          <IoTimerOutline size={size} />
          <span className="absolute -bottom-[2px] -right-[5px] text-[9px] font-black leading-none">3</span>
        </span>
      );
    case 'filters':
      return (
        <span className="relative block h-[18px] w-[18px]">
          <span className="absolute left-0 top-[5px] h-2.5 w-2.5 rounded-full bg-current" />
          <span className="absolute right-0 top-[5px] h-2.5 w-2.5 rounded-full bg-current opacity-90" />
          <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-current opacity-80" />
        </span>
      );
    case 'retouch':
      return <IoColorWandOutline size={size} />;
    case 'text':
      return <IoTextOutline size={size} />;
    case 'stickers':
      return <IoSparklesOutline size={size} />;
    case 'effects':
      return <IoColorWandOutline size={size} />;
    case 'editor':
      return <IoVideocamOutline size={size} />;
    case 'captions':
      return <IoTextOutline size={size} />;
    case 'noise':
      return <BiVolumeFull size={size} />;
    case 'audio':
      return <BiMicrophone size={size} />;
    case 'enhance':
      return <IoSparklesOutline size={size} />;
    case 'privacy':
      return <BiWorld size={size} />;
    case 'split':
      return <FiScissors size={size - 2} />;
    case 'volume':
      return <BiVolumeFull size={size} />;
    case 'rotate':
      return <IoCameraReverseOutline size={size} />;
    case 'delete':
      return <BiTrash size={size} />;
    case 'sync':
      return <BiMusic size={size} />;
    case 'edit':
      return <BiSliderAlt size={size} />;
    case 'sound':
      return <BiMusic size={size} />;
    case 'overlay':
      return <BiImageAlt size={size} />;
    default:
      return <IoOptionsOutline size={size} />;
  }
};

const MediaPreview = ({ image, rotation = 0, className = '', framed = false }) => {
  const isQuarterTurn = Math.abs(rotation % 180) === 90;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={image}
        alt="Create reel"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          transform: `rotate(${rotation}deg) scale(${isQuarterTurn ? 0.68 : 1})`,
          transformOrigin: 'center center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25" />
      {framed && <div className="absolute inset-0 ring-1 ring-white/10" />}
    </div>
  );
};

const CreatePage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { config } = useAppContent();
  const createFlow = config?.createFlow || {};
  const DURATION_OPTIONS = createFlow.durations || ['3m', '60s', '15s', 'Now'];
  const SPEED_OPTIONS = createFlow.speeds || ['0.3x', '0.5x', '1x', '2x', '3x'];
  const CREATE_CANVAS_IMAGE = createFlow.canvasImage || '';
  const CREATE_GALLERY_ITEMS = createFlow.galleryItems || [];
  const CREATE_FILTER_GROUPS = createFlow.filters || [];
  const CREATE_SOUND_LIBRARY = createFlow.sounds || [];
  const CREATE_LOCATION_CHIPS = createFlow.locations?.chips || [];
  const CREATE_LOCATION_RESULTS = createFlow.locations?.results || [];
  const CREATE_HASHTAG_SUGGESTIONS = createFlow.hashtagSuggestions || [];
  const CREATE_LINK_OPTIONS = createFlow.linkOptions || [];
  const CREATE_AUDIENCE_OPTIONS = createFlow.audienceOptions || [];
  const CREATE_SHARE_TARGETS = createFlow.shareTargets || [];
  const CREATE_SIDE_TOOLS = createFlow.sideTools || [];
  const CREATE_PREVIEW_TOOLS = createFlow.previewTools || [];
  const CREATE_EDITOR_ACTIONS = createFlow.editorActions || [];
  const CREATE_EDITOR_PRIMARY_TABS = createFlow.editorPrimaryTabs || [];
  const [stageStack, setStageStack] = useState(['camera']);
  const [activeSheet, setActiveSheet] = useState(null);
  const [activeCameraTool, setActiveCameraTool] = useState(null);
  const [recordStatus, setRecordStatus] = useState('idle');
  const [recordedSeconds, setRecordedSeconds] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState('15s');
  const [selectedSpeed, setSelectedSpeed] = useState('1x');
  const [selectedCountdown, setSelectedCountdown] = useState('3s');
  const [countdownLength, setCountdownLength] = useState(8.9);
  const [captureMode, setCaptureMode] = useState('templates');
  const [activeFilterGroup, setActiveFilterGroup] = useState('portrait');
  const [selectedFilter, setSelectedFilter] = useState('Normal');
  const [selectedSound, setSelectedSound] = useState(
    CREATE_SOUND_LIBRARY[0] || { id: 'sound-original', title: 'Original sound', artist: 'Jhumroo', duration: '00:00', cover: '' }
  );
  const [selectedGalleryIds, setSelectedGalleryIds] = useState(['gallery-1']);
  const [galleryCollection, setGalleryCollection] = useState('all');
  const [editorTab, setEditorTab] = useState('edit');
  const [editorAction, setEditorAction] = useState('speed');
  const [editorSettings, setEditorSettings] = useState({
    speed: 1,
    volume: 100,
    rotation: 0,
    clipLength: 7.2,
  });
  const [showExpandedPreviewTools, setShowExpandedPreviewTools] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [postState, setPostState] = useState(() => createInitialPostState());
  const [tagInfoSeen, setTagInfoSeen] = useState(false);
  const [selectedLocationQuery, setSelectedLocationQuery] = useState('');
  const [storyAllowComments, setStoryAllowComments] = useState(true);
  const [syncingSound, setSyncingSound] = useState(false);
  const [soundBrowserTab, setSoundBrowserTab] = useState('recommended');
  const [favoriteSoundTitles, setFavoriteSoundTitles] = useState(() => readSoundFavorites());

  const stage = stageStack[stageStack.length - 1];
  const isFiltersTrayOpen = activeCameraTool === 'filters';
  const themedOverlayButtonClass = isDarkMode
    ? overlayButtonClass
    : 'flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/92 text-[#111827] shadow-[0_12px_28px_rgba(15,23,42,0.14)] backdrop-blur-md active:opacity-70';
  const themedFloatingPillClass = isDarkMode
    ? 'flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[13px] font-semibold text-white backdrop-blur-md'
    : 'flex items-center gap-2 rounded-full border border-black/10 bg-white/92 px-4 py-2 text-[13px] font-semibold text-[#111827] shadow-[0_12px_28px_rgba(15,23,42,0.14)] backdrop-blur-md';
  const themedToolLabelClass = isDarkMode
    ? 'rounded-full border border-white/10 bg-black/35 px-2.5 py-1 text-[11px] font-medium text-white/90 shadow-[0_8px_20px_rgba(0,0,0,0.22)] backdrop-blur-md'
    : 'rounded-full border border-black/10 bg-white/92 px-2.5 py-1 text-[11px] font-medium text-[#111827] shadow-[0_8px_20px_rgba(15,23,42,0.12)] backdrop-blur-md';
  const getThemedCameraToolButtonClass = (isActive) =>
    `flex h-11 w-11 items-center justify-center rounded-full border shadow-[0_10px_24px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-all ${
      isDarkMode
        ? isActive
          ? 'border-white/25 bg-[linear-gradient(180deg,rgba(160,184,169,0.88)_0%,rgba(114,137,123,0.94)_100%)] text-white scale-[1.04]'
          : 'border-white/10 bg-[linear-gradient(180deg,rgba(134,154,143,0.72)_0%,rgba(95,112,102,0.84)_100%)] text-white'
        : isActive
          ? 'border-black/12 bg-white text-[#111827] scale-[1.04] shadow-[0_14px_28px_rgba(15,23,42,0.14)]'
          : 'border-black/10 bg-white/84 text-[#111827] shadow-[0_12px_24px_rgba(15,23,42,0.12)]'
    }`;
  const themedFiltersTrayClass = isDarkMode
    ? 'mb-4 rounded-[24px] border border-white/10 bg-black/70 px-3 pb-3 pt-3 shadow-[0_14px_40px_rgba(0,0,0,0.38)] backdrop-blur-xl'
    : 'mb-4 rounded-[24px] border border-black/10 bg-white/90 px-3 pb-3 pt-3 shadow-[0_18px_40px_rgba(15,23,42,0.14)] backdrop-blur-xl';
  const themedFiltersDividerClass = isDarkMode ? 'border-white/10' : 'border-black/10';
  const themedFiltersTabTextClass = isDarkMode ? 'text-white/60' : 'text-black/45';
  const themedFiltersActiveTextClass = isDarkMode ? 'text-white' : 'text-black';
  const themedFiltersIndicatorClass = isDarkMode ? 'bg-white' : 'bg-black';
  const themedFiltersCloseClass = isDarkMode
    ? 'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 active:opacity-70'
    : 'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-[#111827] shadow-sm active:opacity-70';
  const themedBottomPanelClass = `absolute inset-x-0 bottom-0 z-20 px-4 pb-[max(1.3rem,env(safe-area-inset-bottom))] ${
    isDarkMode
      ? 'bg-gradient-to-t from-black via-black/80 to-transparent'
      : 'bg-gradient-to-t from-white/95 via-white/82 to-transparent'
  } ${isFiltersTrayOpen ? 'pt-7' : 'pt-12'}`;
  const themedDurationRowClass = `${isFiltersTrayOpen ? 'mb-4' : 'mb-5'} flex items-center justify-center gap-5 text-[12px] ${
    isDarkMode ? 'text-white/80' : 'text-black/70'
  }`;
  const getDurationButtonClass = (isSelected) =>
    `rounded-full px-2 py-1 transition-colors ${
      isSelected
        ? isDarkMode
          ? 'bg-white text-black font-semibold'
          : 'bg-[#111827] text-white font-semibold shadow-sm'
        : isDarkMode
          ? 'text-white/75'
          : 'text-black/55'
    }`;
  const themedTemplateCardClass = isDarkMode
    ? 'min-w-[140px] rounded-[18px] border border-white/15 bg-white/8 p-3 text-left text-white backdrop-blur-sm'
    : 'min-w-[140px] rounded-[18px] border border-black/10 bg-white/92 p-3 text-left text-[#111827] shadow-[0_12px_28px_rgba(15,23,42,0.12)] backdrop-blur-sm';
  const themedTemplateMetaClass = isDarkMode ? 'mt-1 text-[11px] text-white/55' : 'mt-1 text-[11px] text-black/55';
  const themedUtilityTextClass = isDarkMode ? 'text-white' : 'text-[#111827]';
  const themedUtilityBadgeClass = isDarkMode
    ? 'mx-auto flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/25 bg-black/25 backdrop-blur-sm'
    : 'mx-auto flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-black/10 bg-white/92 shadow-[0_10px_20px_rgba(15,23,42,0.10)] backdrop-blur-sm';
  const themedModeTabsClass = `${isFiltersTrayOpen ? 'mt-5' : 'mt-7'} flex items-center justify-center gap-8 text-[14px] font-semibold ${
    isDarkMode ? 'text-white/55' : 'text-black/55'
  }`;
  const favoriteSounds = useMemo(() => {
    const normalizedFavorites = favoriteSoundTitles.map((title) => title.toLowerCase());
    return CREATE_SOUND_LIBRARY.filter((soundItem) => normalizedFavorites.includes(soundItem.title.toLowerCase()));
  }, [favoriteSoundTitles]);

  const pushStage = (nextStage) => {
    setStageStack((currentStack) => [...currentStack, nextStage]);
    setActiveSheet(null);
  };

  const replaceStage = (nextStage) => {
    setStageStack((currentStack) => [...currentStack.slice(0, -1), nextStage]);
    setActiveSheet(null);
  };

  const popStage = () => {
    setStageStack((currentStack) => {
      if (currentStack.length === 1) {
        return currentStack;
      }
      return currentStack.slice(0, -1);
    });
    setActiveSheet(null);
  };

  const showToast = (message) => {
    setToastMessage(message);
  };

  useEffect(() => {
    if (!toastMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage('');
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  useEffect(() => {
    if (recordStatus !== 'recording') {
      return undefined;
    }

    const maxDuration = 7;
    const startAt = Date.now() - recordedSeconds * 1000;
    const intervalId = window.setInterval(() => {
      const elapsedSeconds = Math.min(maxDuration, (Date.now() - startAt) / 1000);

      if (elapsedSeconds >= maxDuration) {
        setRecordedSeconds(maxDuration);
        setRecordStatus('recorded');
        window.clearInterval(intervalId);
        return;
      }

      setRecordedSeconds(elapsedSeconds);
    }, 120);

    return () => window.clearInterval(intervalId);
  }, [recordStatus, recordedSeconds]);

  useEffect(() => {
    if (!syncingSound) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setSyncingSound(false);
      showToast('Sound synced');
    }, 1200);

    return () => window.clearTimeout(timeoutId);
  }, [syncingSound]);

  useEffect(() => {
    if (activeSheet !== 'sound-browser') {
      return;
    }

    setSoundBrowserTab('recommended');
    setFavoriteSoundTitles(readSoundFavorites());
  }, [activeSheet]);

  const selectedMedia = useMemo(() => {
    const selectedItems = CREATE_GALLERY_ITEMS.filter((item) => selectedGalleryIds.includes(item.id));
    return selectedItems[0] || { id: 'captured', image: CREATE_CANVAS_IMAGE, duration: '00:07', type: 'video' };
  }, [selectedGalleryIds]);

  const locationResults = useMemo(() => {
    const normalizedQuery = selectedLocationQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return CREATE_LOCATION_RESULTS;
    }

    return CREATE_LOCATION_RESULTS.filter((locationItem) =>
      [locationItem.title, locationItem.subtitle].join(' ').toLowerCase().includes(normalizedQuery),
    );
  }, [selectedLocationQuery]);

  const activeFilterOptions =
    CREATE_FILTER_GROUPS.find((group) => group.id === activeFilterGroup)?.filters || CREATE_FILTER_GROUPS[0]?.filters || [];

  const hashtagMatch = postState.caption.match(/(^|\s)#([a-z0-9_]*)$/i);
  const hashtagSuggestions = hashtagMatch
    ? CREATE_HASHTAG_SUGGESTIONS.filter((item) =>
        item.label.toLowerCase().includes(`#${(hashtagMatch[2] || '').toLowerCase()}`),
      )
    : [];

  const filteredGalleryItems = CREATE_GALLERY_ITEMS.filter((item) => {
    if (galleryCollection === 'all') {
      return true;
    }
    return item.type === galleryCollection.slice(0, -1);
  });

  const handleCloseOrBack = () => {
    if (activeSheet) {
      setActiveSheet(null);
      return;
    }

    if (stageStack.length > 1) {
      popStage();
      return;
    }

    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate('/user');
  };

  const handleStartOrStopRecording = () => {
    if (recordStatus === 'recording') {
      setRecordStatus('recorded');
      setRecordedSeconds((currentValue) => Math.max(1, currentValue));
      return;
    }

    if (recordStatus === 'recorded') {
      setActiveSheet('discard-last-clip');
      return;
    }

    setActiveCameraTool(null);
    setRecordedSeconds(0);
    setRecordStatus('recording');
  };

  const handleConfirmClip = () => {
    if (recordStatus !== 'recorded') {
      return;
    }

    pushStage('preview');
  };

  const handleDiscardClip = () => {
    setRecordStatus('idle');
    setRecordedSeconds(0);
    setActiveSheet(null);
  };

  const handleCameraToolClick = (toolId) => {
    if (toolId === 'flip' || toolId === 'retouch') {
      showToast(toolId === 'flip' ? 'Camera flipped' : 'Retouch preview on');
      return;
    }

    setActiveCameraTool((currentTool) => (currentTool === toolId ? null : toolId));

    if (toolId === 'timer') {
      setActiveSheet('timer');
    }
  };

  const handlePreviewToolClick = (toolId) => {
    if (toolId === 'editor') {
      pushStage('editor');
      return;
    }

    if (toolId === 'privacy') {
      setActiveSheet('story-privacy');
      return;
    }

    if (toolId === 'noise') {
      showToast('Noise reducer on');
      return;
    }

    if (toolId === 'enhance') {
      showToast('Turned on enhance for video');
      return;
    }

    if (toolId === 'audio') {
      setActiveSheet('sound-browser');
      return;
    }

    showToast(`${toolId.charAt(0).toUpperCase()}${toolId.slice(1)} tools opened`);
  };

  const handleGalleryToggle = (itemId) => {
    setSelectedGalleryIds((currentIds) => {
      if (currentIds.includes(itemId)) {
        if (currentIds.length === 1) {
          return currentIds;
        }
        return currentIds.filter((id) => id !== itemId);
      }

      return [...currentIds, itemId].slice(-3);
    });
  };

  const handleSaveDraftUi = () => {
    showToast('Saved to drafts');
  };

  const handlePublishUi = () => {
    showToast('Post screen is ready');
  };

  const handleStoryPostUi = () => {
    setActiveSheet(null);
    showToast('Story posted');
  };

  const handleSelectHashtag = (hashtagLabel) => {
    setPostState((currentState) => ({
      ...currentState,
      caption: currentState.caption.replace(/(^|\s)#[a-z0-9_]*$/i, `$1${hashtagLabel} `),
    }));
  };

  const handleEditorTabClick = (tabId) => {
    setEditorTab(tabId);

    if (tabId === 'sync') {
      setSyncingSound(true);
      return;
    }

    if (tabId === 'sound') {
      setActiveSheet('replace-sound');
      return;
    }

    if (tabId === 'edit') {
      setEditorAction('speed');
      return;
    }

    showToast(`${tabId.charAt(0).toUpperCase()}${tabId.slice(1)} panel ready`);
  };

  const handleEditorActionClick = (actionId) => {
    if (actionId === 'rotate') {
      setEditorSettings((currentSettings) => ({
        ...currentSettings,
        rotation: (currentSettings.rotation + 90) % 360,
      }));
      setEditorAction(actionId);
      return;
    }

    if (actionId === 'delete') {
      showToast('Delete action is mocked for UI');
      setEditorAction(actionId);
      return;
    }

    setEditorAction(actionId);
  };

  const renderCameraHeader = () => (
    <div
      className="absolute inset-x-0 top-0 z-20 px-4 pb-4"
      style={{ paddingTop: 'max(env(safe-area-inset-top), 14px)' }}
    >
      <div className="flex items-center justify-between">
        <button type="button" onClick={handleCloseOrBack} className={themedOverlayButtonClass}>
          <BiX size={24} />
        </button>
        <button
          type="button"
          onClick={() => setActiveSheet('sound-browser')}
          className={themedFloatingPillClass}
        >
          <BiMusic size={15} />
          <span>Add sound</span>
        </button>
        <span className="h-9 w-9 shrink-0" aria-hidden="true" />
      </div>
    </div>
  );

  const renderCameraSideTools = () => (
    <div
      className={`absolute right-3 z-20 flex flex-col items-end gap-3 transition-all duration-300 ${
        isFiltersTrayOpen ? 'top-[10.5%]' : 'top-[14.5%]'
      }`}
    >
      {CREATE_SIDE_TOOLS.map((tool) => (
        <button
          key={tool.id}
          type="button"
          onClick={() => handleCameraToolClick(tool.id)}
          className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-[#111827]'} active:opacity-70`}
        >
          <span className={getThemedCameraToolButtonClass(activeCameraTool === tool.id)}>
            {getToolIcon(tool.id)}
          </span>
        </button>
      ))}
    </div>
  );

  const renderFiltersTray = () => (
    <div className={themedFiltersTrayClass}>
      <div className={`mb-3 flex items-center gap-2 border-b pb-3 ${themedFiltersDividerClass}`}>
        <div className={`flex min-w-0 flex-1 items-center gap-6 overflow-x-auto no-scrollbar text-[12px] ${themedFiltersTabTextClass}`}>
          {CREATE_FILTER_GROUPS.map((group) => (
            <button
              key={group.id}
              type="button"
              onClick={() => setActiveFilterGroup(group.id)}
              className={`relative whitespace-nowrap ${activeFilterGroup === group.id ? themedFiltersActiveTextClass : ''}`}
            >
              {group.label}
              {activeFilterGroup === group.id && (
                <span className={`absolute inset-x-0 -bottom-3 h-[2px] rounded-full ${themedFiltersIndicatorClass}`} />
              )}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setActiveCameraTool(null)}
          className={themedFiltersCloseClass}
          aria-label="Close filters"
        >
          <BiX size={16} />
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
        {activeFilterOptions.map((filterName, index) => (
          <button
            key={filterName}
            type="button"
            onClick={() => setSelectedFilter(filterName)}
            className={`w-16 shrink-0 text-center ${isDarkMode ? 'text-white' : 'text-[#111827]'} active:opacity-70`}
          >
            <span
              className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full border text-[10px] ${
                selectedFilter === filterName
                  ? isDarkMode
                    ? 'border-white ring-2 ring-white/20'
                    : 'border-black ring-2 ring-black/10'
                  : isDarkMode
                    ? 'border-white/15'
                    : 'border-black/10'
              }`}
              style={{
                background: `url(https://picsum.photos/seed/filter-${activeFilterGroup}-${index}/100/100) center/cover`,
              }}
            />
            <span
              className={`mt-2 block text-[10px] ${
                selectedFilter === filterName
                  ? isDarkMode
                    ? 'text-white'
                    : 'text-black'
                  : isDarkMode
                    ? 'text-white/70'
                    : 'text-black/60'
              }`}
            >
              {filterName}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderCameraBottom = () => (
    <div className={themedBottomPanelClass}>
      {activeCameraTool === 'speed' && (
        <div className={`mb-5 flex items-center justify-center gap-4 text-[13px] font-medium ${isDarkMode ? 'text-white/70' : 'text-black/65'}`}>
          {SPEED_OPTIONS.map((speedOption) => (
            <button
              key={speedOption}
              type="button"
              onClick={() => setSelectedSpeed(speedOption)}
              className={getDurationButtonClass(selectedSpeed === speedOption)}
            >
              {speedOption}
            </button>
          ))}
        </div>
      )}

      <div className={themedDurationRowClass}>
        {DURATION_OPTIONS.map((durationOption) => (
          <button
            key={durationOption}
            type="button"
            onClick={() => setSelectedDuration(durationOption)}
            className={getDurationButtonClass(selectedDuration === durationOption)}
          >
            {durationOption}
          </button>
        ))}
      </div>

      {isFiltersTrayOpen && renderFiltersTray()}

      {captureMode === 'templates' ? (
        <div className="mb-6 flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {['Daily vlog', 'Travel cut', 'Product tease', 'Food drop'].map((templateTitle, index) => (
            <button
              key={templateTitle}
              type="button"
              className={themedTemplateCardClass}
            >
              <div className="h-20 rounded-[14px] bg-gradient-to-br from-[#2f364b] to-[#181d2f]" />
              <p className="mt-3 text-[13px] font-semibold">{templateTitle}</p>
              <p className={themedTemplateMetaClass}>{index + 3} scenes ready</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex items-end justify-between px-2">
          <button type="button" className={`w-[74px] text-center ${themedUtilityTextClass} active:opacity-70`}>
            <span className="mx-auto flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/25 bg-[radial-gradient(circle_at_30%_30%,#ffd8e6_0%,#f4abc1_48%,#d86583_100%)] shadow-[0_10px_20px_rgba(223,109,141,0.32)] backdrop-blur-sm">
              <span className="translate-y-[1px] text-[22px] leading-none drop-shadow-sm" role="img" aria-label="Effects emoji">
                😊
              </span>
            </span>
            <span className="mt-2 block text-[11px] font-medium">Effects</span>
          </button>

          <div className="flex flex-col items-center">
            <span className={`mb-2 text-[12px] font-medium tracking-[0.18em] ${isDarkMode ? 'text-white/85' : 'text-black/75'}`}>
              {formatElapsed(recordedSeconds)}
            </span>
            <button
              type="button"
              onClick={handleStartOrStopRecording}
              className={`relative flex items-center justify-center active:scale-95 ${
                isFiltersTrayOpen ? 'h-20 w-20' : 'h-24 w-24'
              }`}
            >
              <span className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-md" />
              <span
                className={`absolute rounded-full border-[4px] border-white/70 ${
                  isFiltersTrayOpen ? 'inset-[12px]' : 'inset-[14px]'
                }`}
              />
              <span
                className={`relative flex items-center justify-center rounded-full bg-[#fe2c55] transition-all ${
                  isFiltersTrayOpen ? 'h-[48px] w-[48px]' : 'h-[54px] w-[54px]'
                } ${
                  recordStatus === 'recording' ? 'rounded-[16px]' : ''
                }`}
              >
                {recordStatus === 'recording' ? (
                  <span className="h-5 w-5 rounded-[4px] bg-white" />
                ) : (
                  <span className="h-5 w-5 rounded-full bg-white/0" />
                )}
              </span>
            </button>
          </div>

          <div className="flex w-[92px] items-center justify-end gap-2">
            {recordStatus === 'recorded' && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveSheet('discard-last-clip')}
                  className={themedOverlayButtonClass}
                >
                  <BiX size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleConfirmClip}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fe2c55] text-white active:opacity-80"
                >
                  <BiCheck size={18} />
                </button>
              </>
            )}
            {recordStatus !== 'recorded' && (
              <button
                type="button"
                onClick={() => pushStage('upload')}
                className={`w-[74px] text-center ${themedUtilityTextClass} active:opacity-70`}
              >
                <span className={themedUtilityBadgeClass}>
                  <img src={selectedMedia.image} alt="Upload" className="h-full w-full object-cover" />
                </span>
                <span className="mt-2 block text-[11px] font-medium">Upload</span>
              </button>
            )}
          </div>
        </div>
      )}

      <div className={themedModeTabsClass}>
        {['camera', 'story', 'templates'].map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setCaptureMode(mode)}
            className={`relative capitalize ${
              captureMode === mode ? (isDarkMode ? 'text-white' : 'text-black') : ''
            }`}
          >
            {mode}
            {captureMode === mode && (
              <span className={`absolute left-1/2 top-[calc(100%+8px)] h-1.5 w-1.5 -translate-x-1/2 rounded-full ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
            )}
          </button>
        ))}
      </div>
    </div>
  );

  const renderCameraStage = () => (
    <div className={`relative h-full w-full overflow-hidden ${isDarkMode ? 'bg-black text-white' : 'bg-[var(--theme-page-bg)] text-white'}`}>
      <MediaPreview image={CREATE_CANVAS_IMAGE} className="h-full w-full" />
      {renderCameraHeader()}
      {renderCameraSideTools()}
      {renderCameraBottom()}
    </div>
  );

  const renderUploadStage = () => (
    <div className="flex h-full flex-col bg-white text-black">
      <div
        className="border-b border-black/5 px-4 pb-3"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 14px)' }}
      >
        <div className="flex items-center justify-between">
          <button type="button" onClick={handleCloseOrBack} className="active:opacity-60">
            <BiX size={24} />
          </button>
          <div className="flex items-center gap-6 text-[16px] font-semibold">
            <button type="button" className="text-black">
              Recents <BiChevronDown size={16} className="inline-block" />
            </button>
            <button type="button" className="text-black/35">
              Library
            </button>
          </div>
          <span className="w-6" />
        </div>
        <div className="mt-4 flex items-center gap-8 text-[14px] text-black/45">
          {['all', 'videos', 'photos'].map((collection) => (
            <button
              key={collection}
              type="button"
              onClick={() => setGalleryCollection(collection)}
              className={`capitalize ${galleryCollection === collection ? 'font-semibold text-black' : ''}`}
            >
              {collection}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-1 py-1 no-scrollbar">
        <div className="grid grid-cols-4 gap-1">
          {filteredGalleryItems.map((item) => {
            const isSelected = selectedGalleryIds.includes(item.id);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleGalleryToggle(item.id)}
                className="relative aspect-square overflow-hidden bg-black/5 active:opacity-80"
              >
                <img src={item.image} alt="" className="h-full w-full object-cover" />
                <span
                  className={`absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full border ${
                    isSelected ? 'border-white bg-[#20a4ff] text-white' : 'border-white/80 bg-black/10'
                  }`}
                >
                  {isSelected ? <BiCheck size={14} /> : null}
                </span>
                {item.duration && (
                  <span className="absolute bottom-1 right-1 rounded bg-black/55 px-1 py-0.5 text-[10px] text-white">
                    {item.duration}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-black/5 px-4 py-4">
        <button
          type="button"
          onClick={() => replaceStage('editor')}
          className={`w-full rounded-[10px] py-3 text-[15px] font-semibold ${
            selectedGalleryIds.length > 0 ? 'bg-[#fe2c55] text-white' : 'bg-black/5 text-black/30'
          }`}
        >
          Confirm
        </button>
      </div>
    </div>
  );
  const renderEditorAdjustmentPanel = () => {
    if (editorAction === 'speed') {
      return (
        <div className="px-5 pb-6 pt-2 text-white">
          <label className="mb-4 flex items-center gap-2 text-[13px] text-white/65">
            <input type="checkbox" checked readOnly className="accent-[#fe2c55]" />
            Apply to all
          </label>
          <div className="mb-3 flex items-center justify-between text-[11px] text-white/45">
            {['0.1x', '1x', '2x', '5x', '10x'].map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={editorSettings.speed}
            onChange={(event) =>
              setEditorSettings((currentSettings) => ({
                ...currentSettings,
                speed: Number(event.target.value),
              }))
            }
            className="w-full accent-[#fe2c55]"
          />
          <div className="mt-5 flex items-center justify-between text-[15px]">
            <button type="button" className="text-white/70" onClick={() => showToast('Speed edit cancelled')}>
              Cancel
            </button>
            <span className="font-semibold">Speed</span>
            <button type="button" className="font-medium text-white" onClick={() => showToast('Speed saved')}>
              Save
            </button>
          </div>
        </div>
      );
    }

    if (editorAction === 'volume') {
      return (
        <div className="px-5 pb-6 pt-2 text-white">
          <div className="mb-6 text-center text-[13px] text-white/65">{editorSettings.volume}%</div>
          <input
            type="range"
            min="0"
            max="200"
            step="1"
            value={editorSettings.volume}
            onChange={(event) =>
              setEditorSettings((currentSettings) => ({
                ...currentSettings,
                volume: Number(event.target.value),
              }))
            }
            className="w-full accent-[#fe2c55]"
          />
          <div className="mt-5 flex items-center justify-between text-[15px]">
            <button type="button" className="text-white/70" onClick={() => showToast('Volume edit cancelled')}>
              Cancel
            </button>
            <span className="font-semibold">Volume</span>
            <button type="button" className="font-medium text-white" onClick={() => showToast('Volume saved')}>
              Save
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderEditorStage = () => (
    <div className="flex h-full flex-col bg-[#0f0f14] text-white">
      <div
        className="flex items-center justify-between px-4 pb-4"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 14px)' }}
      >
        <button type="button" onClick={handleCloseOrBack} className="text-[15px] text-white/80 active:opacity-70">
          Cancel
        </button>
        <button type="button" onClick={() => replaceStage('preview')} className="text-[15px] font-medium active:opacity-70">
          Save
        </button>
      </div>

      <div className="px-5">
        <div className="mx-auto aspect-[9/16] w-full max-w-[220px] overflow-hidden rounded-[6px] bg-black">
          <MediaPreview image={selectedMedia.image} rotation={editorSettings.rotation} className="h-full w-full" framed />
        </div>

        <div className="mt-5 flex items-center justify-between text-[12px] text-white/50">
          <span>00:00</span>
          <button type="button" className="text-white active:opacity-70">
            <BiPlay size={26} />
          </button>
          <span>{selectedMedia.duration || '00:07'}</span>
        </div>

        <div className="mt-4 rounded-[14px] bg-white/5 p-3">
          <div className="mb-3 flex items-center justify-between text-[11px] text-white/40">
            {['00:00', '00:02', '00:04', '00:06'].map((timeMark) => (
              <span key={timeMark}>{timeMark}</span>
            ))}
          </div>
          <div className="relative rounded-[10px] border border-white/10 bg-[#d7eacf] p-1">
            <div className="flex gap-1 overflow-hidden rounded-[8px]">
              {Array.from({ length: 8 }, (_, frameIndex) => (
                <div key={`frame-${frameIndex}`} className="h-12 flex-1 overflow-hidden rounded-[4px]">
                  <img src={selectedMedia.image} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
            <div
              className="absolute inset-y-1 left-0 rounded-[8px] border-[3px] border-white shadow-[0_0_0_1px_rgba(0,0,0,0.25)]"
              style={{ width: `${Math.min(95, editorSettings.clipLength * 12)}%` }}
            />
            <button
              type="button"
              className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-[10px] bg-white text-black"
              onClick={() => showToast('Add clip action is mocked')}
            >
              <BiPlus size={20} />
            </button>
          </div>

          <div className="relative mt-3 rounded-[10px] bg-[#2b245b] px-3 py-2 text-[12px] text-white">
            <p className="truncate">
              <BiMusic size={12} className="mr-1 inline-block" />
              {selectedSound.title}
            </p>
            <div className="mt-1 h-1 rounded-full bg-white/15">
              <div className="h-full w-3/4 rounded-full bg-[#ffd857]" />
            </div>
          </div>
        </div>
      </div>

      {renderEditorAdjustmentPanel()}

      {editorTab === 'edit' && (
        <div className="mt-auto border-t border-white/10 bg-black/55 px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            {CREATE_EDITOR_ACTIONS.map((actionItem) => (
              <button
                key={actionItem.id}
                type="button"
                onClick={() => handleEditorActionClick(actionItem.id)}
                className={`flex flex-1 flex-col items-center gap-1 rounded-[12px] py-2 text-[11px] ${
                  editorAction === actionItem.id ? 'bg-white/10 text-white' : 'text-white/65'
                }`}
              >
                {getToolIcon(actionItem.id, 20)}
                <span>{actionItem.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-white/10 bg-black/70 px-2 py-2">
        <div className="flex items-center justify-between gap-1">
          {CREATE_EDITOR_PRIMARY_TABS.map((tabItem) => (
            <button
              key={tabItem.id}
              type="button"
              onClick={() => handleEditorTabClick(tabItem.id)}
              className={`flex flex-1 flex-col items-center gap-1 rounded-[12px] py-2 text-[11px] ${
                editorTab === tabItem.id ? 'text-white' : 'text-white/55'
              }`}
            >
              {getToolIcon(tabItem.id, 20)}
              <span>{tabItem.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPreviewStage = () => (
    <div className={`relative h-full overflow-hidden ${isDarkMode ? 'bg-black text-white' : 'bg-[var(--theme-page-bg)] text-white'}`}>
      <MediaPreview image={selectedMedia.image} rotation={editorSettings.rotation} className="h-full w-full" />

      <div
        className="absolute inset-x-0 top-0 z-20 px-4 pb-4"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 14px)' }}
      >
        <div className="flex items-center justify-between">
          <button type="button" onClick={handleCloseOrBack} className={themedOverlayButtonClass}>
            <BiX size={22} />
          </button>
          <button
            type="button"
            onClick={() => setActiveSheet('sound-browser')}
            className={themedFloatingPillClass}
          >
            <BiMusic size={15} />
            <span>Add sound</span>
          </button>
          <button type="button" onClick={() => showToast('Text layer ready')} className={themedOverlayButtonClass}>
            <span className="text-[18px] font-semibold">Aa</span>
          </button>
        </div>
      </div>

      <div className="absolute right-3 top-[14%] bottom-[132px] z-20 flex flex-col items-end">
        <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar pr-1">
          <div className="flex flex-col items-end gap-3">
            {CREATE_PREVIEW_TOOLS.slice(0, showExpandedPreviewTools ? CREATE_PREVIEW_TOOLS.length : 6).map((tool) => (
              <button
                key={tool.id}
                type="button"
                onClick={() => handlePreviewToolClick(tool.id)}
                className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-[#111827]'} active:opacity-70`}
              >
                {showExpandedPreviewTools && (
                  <span className={themedToolLabelClass}>
                    {tool.label}
                  </span>
                )}
                <span className={getThemedCameraToolButtonClass(false)}>{getToolIcon(tool.id)}</span>
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowExpandedPreviewTools((currentValue) => !currentValue)}
          className={`mt-3 flex shrink-0 items-center gap-2 ${isDarkMode ? 'text-white' : 'text-[#111827]'} active:opacity-70`}
        >
          {showExpandedPreviewTools && (
            <span className={themedToolLabelClass}>
              Hide tools
            </span>
          )}
          <span className={getThemedCameraToolButtonClass(false)}>
            <BiChevronDown size={18} className={showExpandedPreviewTools ? 'rotate-180' : ''} />
          </span>
        </button>
      </div>

      <div
        className={`absolute inset-x-0 bottom-0 z-20 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-24 ${
          isDarkMode ? 'bg-gradient-to-t from-black/95 via-black/70 to-transparent' : 'bg-gradient-to-t from-white/96 via-white/80 to-transparent'
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveSheet('story-post')}
            className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-[10px] text-[14px] font-medium active:opacity-80 ${
              isDarkMode
                ? 'bg-white/90 text-black'
                : 'border border-black/10 bg-white text-[#111827] shadow-[0_12px_24px_rgba(15,23,42,0.10)]'
            }`}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#8ad7df] bg-[#e7f9fb]">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=story-user"
                alt=""
                className="h-5 w-5 rounded-full"
              />
            </span>
            <span>Your Story</span>
          </button>
          <button
            type="button"
            onClick={() => pushStage('post')}
            className="h-12 flex-1 rounded-[10px] bg-[#fe2c55] text-[14px] font-semibold text-white active:opacity-80"
          >
            {captureMode === 'story' ? 'Next' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderPostStage = () => (
    <div className="flex h-full flex-col bg-white text-black">
      <div
        className="flex items-center justify-between border-b border-black/5 px-4 pb-4"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 14px)' }}
      >
        <button type="button" onClick={handleCloseOrBack} className="active:opacity-60">
          <BiChevronLeft size={22} />
        </button>
        <h2 className="text-[18px] font-semibold">Post</h2>
        <span className="w-6" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="border-b border-black/5 px-4 py-4">
          <div className="flex gap-4">
            <textarea
              value={postState.caption}
              onChange={(event) =>
                setPostState((currentState) => ({
                  ...currentState,
                  caption: event.target.value,
                }))
              }
              placeholder="Describe your post, add hashtags, or mention creators that inspired you"
              className="min-h-[110px] flex-1 resize-none border-none bg-transparent text-[15px] outline-none placeholder:text-black/35"
            />
            <button
              type="button"
              onClick={() => showToast('Cover picker is mocked for UI')}
              className="relative h-[110px] w-[82px] overflow-hidden rounded-[6px] border border-black/10"
            >
              <img src={selectedMedia.image} alt="Cover" className="h-full w-full object-cover" />
              <span className="absolute inset-x-0 bottom-0 bg-black/55 px-2 py-2 text-left text-[11px] font-medium text-white">
                Select cover
              </span>
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setPostState((currentState) => ({
                  ...currentState,
                  caption: `${currentState.caption}${currentState.caption ? ' ' : ''}#`,
                }))
              }
              className="rounded-[4px] border border-black/10 px-2.5 py-1.5 text-[12px] font-medium active:opacity-70"
            >
              Hashtags
            </button>
            <button
              type="button"
              onClick={() => pushStage('mention')}
              className="rounded-[4px] border border-black/10 px-2.5 py-1.5 text-[12px] font-medium active:opacity-70"
            >
              Mention
            </button>
            <button
              type="button"
              onClick={() =>
                setPostState((currentState) => ({
                  ...currentState,
                  caption: `${currentState.caption}${currentState.caption ? ' ' : ''}video`,
                }))
              }
              className="rounded-[4px] border border-black/10 px-2.5 py-1.5 text-[12px] font-medium active:opacity-70"
            >
              Videos
            </button>
          </div>

          {hashtagSuggestions.length > 0 && (
            <div className="mt-4 overflow-hidden rounded-[12px] border border-black/5">
              {hashtagSuggestions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectHashtag(item.label)}
                  className="flex w-full items-center justify-between border-b border-black/5 px-4 py-3 text-left last:border-b-0 active:bg-black/[0.03]"
                >
                  <span className="text-[15px] text-black/80">{item.label}</span>
                  <span className="text-[13px] text-black/40">{item.views}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-1 bg-[#f5f5f5] px-4 py-4">
          <button
            type="button"
            onClick={() => {
              if (tagInfoSeen) {
                pushStage('tag-people');
                return;
              }
              setActiveSheet('tag-info');
            }}
            className="flex w-full items-center justify-between rounded-[10px] bg-white px-4 py-4 active:opacity-80"
          >
            <div className="flex items-center gap-3">
              <span className="text-black/45">
                <BiAt size={18} />
              </span>
              <span className="text-[15px]">Tag people</span>
            </div>
            <BiChevronRight size={18} className="text-black/35" />
          </button>

          <button
            type="button"
            onClick={() => pushStage('location')}
            className="flex w-full items-center justify-between rounded-[10px] bg-white px-4 py-4 active:opacity-80"
          >
            <div className="flex items-center gap-3">
              <span className="text-black/45">
                <IoLocationOutline size={18} />
              </span>
              <span className="text-[15px]">Location</span>
            </div>
            <div className="flex items-center gap-2 text-[13px] text-black/35">
              <span>{postState.location || 'Add'}</span>
              <BiChevronRight size={18} />
            </div>
          </button>

          <div className="flex gap-2 overflow-x-auto no-scrollbar rounded-[10px] bg-white px-4 py-3">
            {CREATE_LOCATION_CHIPS.map((chipLabel) => (
              <button
                key={chipLabel}
                type="button"
                onClick={() =>
                  setPostState((currentState) => ({
                    ...currentState,
                    location: chipLabel,
                  }))
                }
                className={`shrink-0 rounded-[4px] border px-3 py-1.5 text-[12px] ${
                  postState.location === chipLabel ? 'border-[#fe2c55] text-[#fe2c55]' : 'border-black/10 text-black/70'
                }`}
              >
                {chipLabel}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setActiveSheet('add-link')}
            className="flex w-full items-center justify-between rounded-[10px] bg-white px-4 py-4 active:opacity-80"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-5 w-5 grid-cols-2 gap-0.5 rounded-sm">
                <span className="rounded-sm bg-[#ff4f77]" />
                <span className="rounded-sm bg-[#ffc233]" />
                <span className="rounded-sm bg-[#28b6ff]" />
                <span className="rounded-sm bg-[#38d68f]" />
              </span>
              <span className="text-[15px]">Add link</span>
            </div>
            <span className="text-[20px] text-[#fe2c55]">+</span>
          </button>
        </div>

        <div className="space-y-1 px-4 py-4">
          <button
            type="button"
            onClick={() => setActiveSheet('audience')}
            className="flex w-full items-center justify-between rounded-[10px] px-0 py-3 active:opacity-80"
          >
            <div className="flex items-center gap-3">
              <BiWorld size={18} className="text-black/45" />
              <span className="text-[15px]">Who can watch this video</span>
            </div>
            <div className="flex items-center gap-2 text-[13px] text-black/40">
              <span>{CREATE_AUDIENCE_OPTIONS.find((item) => item.id === postState.audience)?.label || 'Everyone'}</span>
              <BiChevronRight size={18} />
            </div>
          </button>

          {[
            {
              key: 'allowComments',
              label: 'Allow comments',
            },
            {
              key: 'allowDuet',
              label: 'Allow Duet',
            },
            {
              key: 'allowStitch',
              label: 'Allow Stitch',
            },
            {
              key: 'highQuality',
              label: 'Allow high-quality uploads',
            },
          ].map((toggleItem) => (
            <div key={toggleItem.key} className="flex items-center justify-between py-3">
              <span className="text-[15px]">{toggleItem.label}</span>
              <Toggle
                enabled={postState[toggleItem.key]}
                isDarkMode={isDarkMode}
                onToggle={() =>
                  setPostState((currentState) => ({
                    ...currentState,
                    [toggleItem.key]: !currentState[toggleItem.key],
                  }))
                }
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() => pushStage('more-options')}
            className="flex w-full items-center justify-between py-3 active:opacity-80"
          >
            <div>
              <p className="text-left text-[15px]">More options</p>
              <p className="mt-1 text-left text-[12px] text-black/35">Branded content</p>
            </div>
            <BiChevronRight size={18} className="text-black/35" />
          </button>
        </div>

        <div className="px-4 pb-28">
          <p className="text-[12px] text-black/35">Automatically share to:</p>
          <div className="mt-3 flex items-center gap-3">
            {CREATE_SHARE_TARGETS.map((targetLabel) => (
              <button
                key={targetLabel}
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-[11px] text-black/40"
              >
                {targetLabel[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-black/5 bg-white px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleSaveDraftUi}
            className="rounded-[10px] border border-black/10 py-3 text-[15px] font-medium text-black active:opacity-80"
          >
            Drafts
          </button>
          <button
            type="button"
            onClick={handlePublishUi}
            className="rounded-[10px] bg-[#fe2c55] py-3 text-[15px] font-semibold text-white active:opacity-80"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );

  const renderEmptySearchStage = (title) => (
    <div className="flex h-full flex-col bg-white text-black">
      <div
        className="border-b border-black/5 px-4 pb-4"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 14px)' }}
      >
        <div className="flex items-center justify-between">
          <button type="button" onClick={handleCloseOrBack} className="active:opacity-60">
            <BiX size={22} />
          </button>
          <h2 className="text-[18px] font-semibold">{title}</h2>
          <span className="w-6" />
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-[10px] bg-[#f4f5f7] px-3 py-2 text-black/35">
          <BiSearch size={18} />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent text-[14px] outline-none placeholder:text-black/30"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-black/25 text-black/35">
          <BiAt size={32} />
        </div>
        <p className="mt-6 text-[22px] font-semibold">Not following anyone yet</p>
        <p className="mt-2 text-[14px] text-black/40">Search for an account to mention</p>
      </div>
    </div>
  );

  const renderLocationStage = () => (
    <div className="flex h-full flex-col bg-white text-black">
      <div
        className="border-b border-black/5 px-4 pb-4"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 14px)' }}
      >
        <div className="flex items-center justify-between">
          <button type="button" onClick={handleCloseOrBack} className="active:opacity-60">
            <BiX size={22} />
          </button>
          <h2 className="text-[18px] font-semibold">Add location</h2>
          <span className="w-6" />
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-[10px] bg-[#f4f5f7] px-3 py-2 text-black/35">
          <BiSearch size={18} />
          <input
            type="text"
            placeholder="Search locations"
            value={selectedLocationQuery}
            onChange={(event) => setSelectedLocationQuery(event.target.value)}
            className="w-full bg-transparent text-[14px] outline-none placeholder:text-black/30"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 no-scrollbar">
        <p className="mb-4 text-[12px] text-black/35">Popular places in your area</p>
        <div className="space-y-5">
          {locationResults.map((locationItem) => (
            <button
              key={locationItem.id}
              type="button"
              onClick={() => {
                setPostState((currentState) => ({
                  ...currentState,
                  location: locationItem.title,
                }));
                popStage();
              }}
              className="block w-full text-left active:opacity-70"
            >
              <p className="text-[16px] font-semibold">{locationItem.title}</p>
              <p className="mt-1 text-[13px] text-black/40">{locationItem.subtitle}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMoreOptionsStage = () => (
    <div className="flex h-full flex-col bg-white text-black">
      <div
        className="flex items-center justify-between border-b border-black/5 px-4 pb-4"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 14px)' }}
      >
        <button type="button" onClick={handleCloseOrBack} className="active:opacity-60">
          <BiX size={22} />
        </button>
        <h2 className="text-[18px] font-semibold">More options</h2>
        <span className="w-6" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 no-scrollbar">
        <div className="flex items-center justify-between py-4">
          <span className="text-[15px]">Save to device</span>
          <Toggle
            enabled={postState.saveToDevice}
            isDarkMode={isDarkMode}
            onToggle={() =>
              setPostState((currentState) => ({
                ...currentState,
                saveToDevice: !currentState.saveToDevice,
              }))
            }
          />
        </div>

        <div className="flex items-center justify-between py-4">
          <span className="text-[15px]">Allow auto-generated captions</span>
          <Toggle
            enabled={postState.autoCaptions}
            isDarkMode={isDarkMode}
            onToggle={() =>
              setPostState((currentState) => ({
                ...currentState,
                autoCaptions: !currentState.autoCaptions,
              }))
            }
          />
        </div>

        <button type="button" className="flex w-full items-center justify-between py-4 text-left active:opacity-80">
          <div>
            <p className="text-[15px]">Select caption language</p>
            <p className="mt-1 text-[12px] text-black/35">
              Auto-generated captions will be shown based on the selected language
            </p>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-black/40">
            <span>{postState.captionLanguage}</span>
            <BiChevronRight size={18} />
          </div>
        </button>

        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-[15px]">Audience controls</p>
            <p className="mt-1 text-[12px] text-black/35">This video is limited to those aged 18 years and older</p>
          </div>
          <Toggle
            enabled={postState.audienceControls}
            isDarkMode={isDarkMode}
            onToggle={() =>
              setPostState((currentState) => ({
                ...currentState,
                audienceControls: !currentState.audienceControls,
              }))
            }
          />
        </div>

        <button type="button" className="flex w-full items-center justify-between py-4 text-left active:opacity-80">
          <div>
            <p className="text-[15px]">Branded content and ads</p>
            <p className="mt-1 text-[12px] text-black/35">Disclose the content created as sponsored content and manage ad settings</p>
          </div>
          <BiChevronRight size={18} className="text-black/35" />
        </button>
      </div>
    </div>
  );

  const renderActiveStage = () => {
    switch (stage) {
      case 'upload':
        return renderUploadStage();
      case 'editor':
        return renderEditorStage();
      case 'preview':
        return renderPreviewStage();
      case 'post':
        return renderPostStage();
      case 'mention':
        return renderEmptySearchStage('@Mention');
      case 'tag-people':
        return renderEmptySearchStage('Tag people');
      case 'location':
        return renderLocationStage();
      case 'more-options':
        return renderMoreOptionsStage();
      default:
        return renderCameraStage();
    }
  };

  return (
    <div className={`theme-create-page relative h-full min-h-screen w-full overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-[var(--theme-page-bg)]'}`}>
      {renderActiveStage()}

      {toastMessage && (
        <div
          className="absolute left-1/2 top-5 z-50 -translate-x-1/2 rounded-[8px] bg-[#5c554f] px-5 py-2 text-[13px] font-medium text-white shadow-xl"
          style={{ top: 'max(env(safe-area-inset-top), 14px)' }}
        >
          {toastMessage}
        </div>
      )}

      {syncingSound && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/35">
          <div className="rounded-[18px] bg-[#4d4d55] px-6 py-5 text-center text-white shadow-xl">
            <BiMusic size={20} className="mx-auto mb-3 animate-pulse" />
            <p className="text-[15px] font-medium">Syncing sounds...</p>
          </div>
        </div>
      )}

      {activeSheet === 'timer' && (
        <BottomSheet title="Set countdown" onClose={() => setActiveSheet(null)}>
          <div className="px-5">
            <div className="grid grid-cols-2 gap-3">
              {['3s', '10s'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedCountdown(option)}
                  className={`rounded-[10px] py-4 text-[18px] font-semibold ${
                    selectedCountdown === option ? 'bg-black text-white' : 'bg-black/5 text-black/65'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="mt-5 text-[13px] text-black/55">Drag to adjust clip length</p>
            <div className="mt-3">
              <div className="mb-2 flex items-center justify-between text-[12px] text-black/35">
                <span>0s</span>
                <span>{countdownLength.toFixed(1)}s</span>
                <span>15s</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="0.1"
                value={countdownLength}
                onChange={(event) => setCountdownLength(Number(event.target.value))}
                className="w-full accent-[#fe2c55]"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveSheet(null);
                showToast(`Countdown set to ${selectedCountdown}`);
              }}
              className="mb-2 mt-6 w-full rounded-[10px] bg-[#fe2c55] py-3 text-[15px] font-semibold text-white"
            >
              Start
            </button>
          </div>
        </BottomSheet>
      )}

      {activeSheet === 'discard-last-clip' && (
        <CenterModal
          title="Discard the last clip?"
          description="This is a UI-only create flow. You can keep the clip for preview or discard it here."
          primaryLabel="Discard"
          secondaryLabel="Keep"
          isDarkMode={isDarkMode}
          onPrimary={handleDiscardClip}
          onSecondary={() => setActiveSheet(null)}
        />
      )}

      {activeSheet === 'sound-browser' && (
        <BottomSheet
          title={soundBrowserTab === 'favorites' ? 'Favorites' : 'Recommended'}
          onClose={() => setActiveSheet(null)}
          scrollable
        >
          <div className="px-4 pb-2">
            <div className="mb-4 flex items-center justify-between border-b border-black/5 pb-3">
              <div className="flex items-center gap-5 text-[14px]">
                <button
                  type="button"
                  onClick={() => setSoundBrowserTab('recommended')}
                  className={soundBrowserTab === 'recommended' ? 'font-semibold text-black' : 'text-black/35'}
                >
                  Recommended
                </button>
                <button
                  type="button"
                  onClick={() => setSoundBrowserTab('favorites')}
                  className={soundBrowserTab === 'favorites' ? 'font-semibold text-black' : 'text-black/35'}
                >
                  Favorites
                </button>
              </div>
              <button type="button" className="text-black/35 active:opacity-70">
                <BiSearch size={18} />
              </button>
            </div>
            {soundBrowserTab === 'favorites' && favoriteSounds.length === 0 ? (
              <div className="px-2 py-8 text-center">
                <p className="text-[15px] font-semibold text-black">No favorite sounds yet</p>
                <p className="mt-2 text-[13px] text-black/45">Add sounds to favorites and they will appear here.</p>
              </div>
            ) : (
              <div className="max-h-[48vh] space-y-3 overflow-y-auto pb-2 pr-1">
                {(soundBrowserTab === 'favorites' ? favoriteSounds : CREATE_SOUND_LIBRARY).map((soundItem) => (
                  <button
                    key={soundItem.id}
                    type="button"
                    onClick={() => {
                      setSelectedSound(soundItem);
                      setActiveSheet(null);
                      showToast(`Selected ${soundItem.title}`);
                    }}
                    className="flex w-full items-center gap-3 rounded-[12px] px-1 py-1 text-left active:bg-black/[0.03]"
                  >
                    <img src={soundItem.cover} alt={soundItem.title} className="h-12 w-12 rounded-[8px] object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-semibold text-black">{soundItem.title}</p>
                      <p className="text-[13px] text-black/45">
                        {soundItem.artist} - {soundItem.duration}
                      </p>
                    </div>
                    {selectedSound.id === soundItem.id && <BiCheck size={18} className="text-[#fe2c55]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </BottomSheet>
      )}

      {activeSheet === 'replace-sound' && (
        <BottomSheet title="Replace sound" onClose={() => setActiveSheet(null)}>
          <div className="px-4 pb-3">
            <div className="mb-4 rounded-[12px] bg-black/5 p-3 text-[13px] text-black/55">
              Current sound: <span className="font-semibold text-black">{selectedSound.title}</span>
            </div>
            <div className="space-y-3">
              {CREATE_SOUND_LIBRARY.map((soundItem) => (
                <button
                  key={soundItem.id}
                  type="button"
                  onClick={() => {
                    setSelectedSound(soundItem);
                    setActiveSheet(null);
                    showToast('Sound replaced');
                  }}
                  className="flex w-full items-center gap-3 rounded-[12px] px-1 py-1 text-left active:bg-black/[0.03]"
                >
                  <img src={soundItem.cover} alt={soundItem.title} className="h-12 w-12 rounded-[8px] object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold">{soundItem.title}</p>
                    <p className="text-[13px] text-black/45">
                      {soundItem.artist} - {soundItem.duration}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </BottomSheet>
      )}

      {activeSheet === 'story-post' && (
        <CenterModal
          title="Post Story publicly?"
          description="Your account is public and your public videos will be visible to everyone. You can make this video private, or switch to a private account in your privacy settings."
          primaryLabel="Post Now"
          secondaryLabel="Cancel"
          isDarkMode={isDarkMode}
          onPrimary={handleStoryPostUi}
          onSecondary={() => setActiveSheet(null)}
        />
      )}

      {activeSheet === 'story-privacy' && (
        <BottomSheet title="Privacy settings" onClose={() => setActiveSheet(null)} compact>
          <div className="px-5 pb-2">
            <h4 className="text-[15px] font-semibold">Who can watch this</h4>
            <div className="mt-3 space-y-4">
              {CREATE_AUDIENCE_OPTIONS.map((audienceItem) => (
                <button
                  key={audienceItem.id}
                  type="button"
                  onClick={() =>
                    setPostState((currentState) => ({
                      ...currentState,
                      audience: audienceItem.id,
                    }))
                  }
                  className="flex w-full items-center justify-between text-left"
                >
                  <div>
                    <p className="text-[15px]">{audienceItem.label}</p>
                    {audienceItem.subtitle && (
                      <p className="mt-1 text-[12px] text-black/35">{audienceItem.subtitle}</p>
                    )}
                  </div>
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                      postState.audience === audienceItem.id
                        ? 'border-[#fe2c55] text-[#fe2c55]'
                        : 'border-black/15 text-transparent'
                    }`}
                  >
                    <span className="h-3 w-3 rounded-full bg-current" />
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-black/5 py-4">
              <span className="text-[15px]">Allow comments</span>
              <Toggle
                enabled={storyAllowComments}
                isDarkMode={isDarkMode}
                onToggle={() => setStoryAllowComments((currentValue) => !currentValue)}
              />
            </div>
          </div>
        </BottomSheet>
      )}

      {activeSheet === 'tag-info' && (
        <BottomSheet title="Tag people in this video" onClose={() => setActiveSheet(null)}>
          <div className="px-5 pb-3">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-black/5 text-black/45">
              <BiAt size={28} />
            </div>
            <div className="space-y-4 text-[14px] text-black/60">
              <p>People you tag are visible to anyone who can watch this video.</p>
              <p>You can edit tagged people after the video is posted. People you tag can also remove themselves.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setTagInfoSeen(true);
                setActiveSheet(null);
                pushStage('tag-people');
              }}
              className="mt-6 w-full rounded-[10px] bg-[#fe2c55] py-3 text-[15px] font-semibold text-white"
            >
              OK
            </button>
          </div>
        </BottomSheet>
      )}

      {activeSheet === 'add-link' && (
        <BottomSheet title="Add link" onClose={() => setActiveSheet(null)}>
          <div className="space-y-1 px-4 pb-2">
            {CREATE_LINK_OPTIONS.map((linkItem) => (
              <button
                key={linkItem.id}
                type="button"
                onClick={() => {
                  setPostState((currentState) => ({
                    ...currentState,
                    linkType: linkItem.title,
                  }));
                  setActiveSheet(null);
                  showToast(`${linkItem.title} link selected`);
                }}
                className="flex w-full items-center gap-3 rounded-[12px] px-2 py-3 text-left active:bg-black/[0.03]"
              >
                <span className={`flex h-11 w-11 items-center justify-center rounded-[12px] ${linkItem.accent} text-white`}>
                  <BiLinkAlt size={18} />
                </span>
                <div>
                  <p className="text-[15px] font-semibold">{linkItem.title}</p>
                  <p className="mt-1 text-[12px] text-black/40">{linkItem.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </BottomSheet>
      )}

      {activeSheet === 'audience' && (
        <BottomSheet title="Who can watch this video" onClose={() => setActiveSheet(null)} compact>
          <div className="px-5 pb-2">
            {CREATE_AUDIENCE_OPTIONS.map((audienceItem) => (
              <button
                key={audienceItem.id}
                type="button"
                onClick={() => {
                  setPostState((currentState) => ({
                    ...currentState,
                    audience: audienceItem.id,
                  }));
                  setActiveSheet(null);
                }}
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <div>
                  <p className="text-[15px]">{audienceItem.label}</p>
                  {audienceItem.subtitle && (
                    <p className="mt-1 text-[12px] text-black/35">{audienceItem.subtitle}</p>
                  )}
                </div>
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                    postState.audience === audienceItem.id
                      ? 'border-[#fe2c55] text-[#fe2c55]'
                      : 'border-black/15 text-transparent'
                  }`}
                >
                  <span className="h-3 w-3 rounded-full bg-current" />
                </span>
              </button>
            ))}
          </div>
        </BottomSheet>
      )}
    </div>
  );
};

export default CreatePage;
