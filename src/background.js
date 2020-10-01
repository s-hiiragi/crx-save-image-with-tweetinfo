chrome.contextMenus.create(
  {title: "save with tweetinfo", id: "save_with_tweetinfo",
  documentUrlPatterns: ['https://twitter.com/*'],
  contexts: ["image"]}
);

chrome.contextMenus.onClicked.addListener((info, tab)=>{
  console.log("item " + info.menuItemId + " was clicked");
  console.log("  info: " + JSON.stringify(info));
  console.log("  tab: " + JSON.stringify(tab));

  switch (info.menuItemId) {
    case "save_with_tweetinfo":
      saveImageWithTweetInfo(info.pageUrl, info.srcUrl, tab.id);
      break;
  }
});

async function saveImageWithTweetInfo(pageUrl, imageUrl, tabId) {
  const pageUrlElts = new URL(pageUrl);
  const basename = pageUrlElts.pathname.replace(/^\//, '').replace(/[\/]/g, '_');

  const imageUrlElts = new URL(imageUrl);
  const format = imageUrlElts.searchParams.get('format');
  const extension = format;

  const filename = `${basename}.${extension}`;

  return chrome.downloads.download({
    'url': imageUrl,
    'filename': filename,
    'saveAs': true
  });
}
