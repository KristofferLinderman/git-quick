type BtnIcons = '🍒' | '🔄';
type BTN_TITLES = 'Cherry-Pick' | 'Revert';

const WRAPPER_ID = 'git-quick-wrapper';

let shouldShowCherry: boolean = false;
let shouldShowRevert: boolean = false;
let previousUrl: string = '';
let isRunning = false;
let hasWrapper = false;

// Get settings and listen to changes
chrome.storage.sync.get('cherry', data => {
  shouldShowCherry = !!data['cherry'];
});

chrome.storage.sync.get('revert', data => {
  shouldShowRevert = !!data['revert'];
});

const handleStorageChange = (event: {
  [key: string]: chrome.storage.StorageChange;
}) => {
  if (Object.keys(event).includes('cherry')) {
    shouldShowCherry = event.cherry.newValue;
    renderButtons();
  } else if (Object.keys(event).includes('revert')) {
    shouldShowRevert = event.revert.newValue;
    renderButtons();
  }
};

chrome.storage.onChanged.addListener(handleStorageChange);

const copyGitCommad = (
  button: HTMLButtonElement,
  commitSHA: string,
  btnIcon: BtnIcons,
  gitCommand: string
) => {
  navigator.clipboard.writeText(`git ${gitCommand} ${commitSHA}`).then(
    () => {
      // Successful copy to  clipboard.
      button.innerHTML =
        '<svg style="display: inline-block;" aria-hidden="false" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-check color-fg-success"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path></svg>';

      setTimeout(() => {
        button.innerText = btnIcon;
      }, 1000);
    },
    () => {
      alert('Failed to copy SHA');
    }
  );
};

const createBtn = (commitSHA: string, icon: BtnIcons, title: BTN_TITLES) => {
  const button = document.createElement('button');
  button.id = `${title}-${commitSHA}`;

  button.style.padding = '0';
  button.style.border = '1px solid rgba(31, 35, 40, 0.15)';
  button.style.borderRadius = '5px';
  button.style.backgroundColor = 'rgb(246, 248, 250)';
  button.style.width = '28px';
  button.style.height = '28px';

  button.title = title;
  button.innerText = icon;

  switch (title) {
    case 'Cherry-Pick':
      button.onclick = () =>
        copyGitCommad(button, commitSHA, icon, 'cherry-pick');
      break;
    case 'Revert':
      button.onclick = () => copyGitCommad(button, commitSHA, icon, 'revert');
      break;
  }

  return button;
};

const CreateWrapper = (wrapperId: string) => {
  const existingWrapper = document.getElementById(wrapperId);
  if (existingWrapper) {
    existingWrapper.innerHTML = '';
    return existingWrapper;
  }
  const wrapper = document.createElement('div');

  wrapper.style.display = 'flex';
  wrapper.style.marginLeft = '2rem';
  wrapper.style.gap = '.5rem';
  wrapper.style.opacity = '0';
  wrapper.style.transform = 'translateY(10px)';
  wrapper.style.transition = 'all 1s ease-in-out';

  wrapper.id = wrapperId;

  return wrapper;
};

const renderButtons = () => {
  if (!shouldShowCherry && !shouldShowRevert) {
    const allWrappers = document.querySelectorAll(`[id^='git-quick-wrapper']`);

    allWrappers.forEach(element => {
      element.remove();
    });
    return;
  }

  const commitItems = document.querySelectorAll('.TimelineItem-body > ol > li');
  commitItems.forEach(commitItem => {
    const liElem = commitItem as HTMLLIElement;
    const commitSHA = liElem.dataset.url?.split('commits/')[1].split('/')[0];

    if (!commitSHA) {
      return;
    }

    const wrapper = CreateWrapper(`${WRAPPER_ID}-${commitSHA.substring(0, 5)}`);

    if (
      shouldShowCherry &&
      document.getElementById(`cherry-Pick-${commitSHA}`) === null
    ) {
      const cherryBtn = createBtn(commitSHA, '🍒', 'Cherry-Pick');
      wrapper.append(cherryBtn);
    }

    if (
      shouldShowRevert &&
      document.getElementById(`revert-${commitSHA}`) === null
    ) {
      const revertBtn = createBtn(commitSHA, '🔄', 'Revert');
      wrapper.append(revertBtn);
    }

    liElem.style.alignItems = 'center';
    liElem.append(wrapper);

    setTimeout(() => {
      wrapper.style.opacity = '1';
      wrapper.style.transform = 'translateY(0)';
    }, 0);
  });
};

// Check url changes
setInterval(() => {
  const currentURL = window.location.href;
  if (currentURL === previousUrl) {
    return;
  }
  previousUrl = currentURL;

  if (currentURL.includes('/commits/')) {
    main();
  }
}, 200);

const main = () => {
  isRunning = true;
  if (document.getElementById('git-quick-wrapper')) {
    return;
  }
  renderButtons();
};
