// 供popup页面调用

document.getElementById('start').addEventListener('click', () => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true
      },
      function(tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            type: 'running',
          },
          function(response) {
            console.log(response)
          }
        )
      }
    )

})
