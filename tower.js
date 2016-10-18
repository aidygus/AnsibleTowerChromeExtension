chrome.extension.sendMessage({}, function(response) {
	var AnsibleHostName = /.*/;
	chrome.storage.sync.get({
    hostname: '.*'
  }, function(items) {
    AnsibleHostName = /^https?:\/\/(items.hostname)(\/#\/inventories\/\d.\/system-tracking\/\d.,\d.\/?)/;
  });

	if(AnsibleHostName.test(location.href)) {
		var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);
			$(document).on('click','div.FactDataTable-groupHeadingRow.ng-scope',function(){ $(this).next().toggle(); });
			// select the target node
			var readyState = setInterval(function(){
				var target = $('div.FactDataTable-groupHeadingRow.ng-scope');
				if(target.size() != 0) {
					clearInterval(readyState);
					target.each(function(){
						$(this).children().removeClass('FactDataTable-column--full');
						$(this).append('<span class="FactDataTable-column FactDataGroup-header ng-binding">'+$(this).next().find('div.FactDataTable-row.FactDatum.ng-scope.FactDatum--divergent').size()+'  differences</span>');
						$(this).next().toggle();
					});
				}
			}, 500);
		}
		}, 10);
	}
});
