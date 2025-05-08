
var Module;

if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

  var PACKAGE_PATH;
  if (typeof window === 'object') {
    PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
  } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'game.data';
    var REMOTE_PACKAGE_BASE = 'game.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      Module.printErr('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = typeof Module['locateFile'] === 'function' ?
    Module['locateFile'](REMOTE_PACKAGE_BASE) :
    ((Module['filePackagePrefixURL'] || '') + REMOTE_PACKAGE_BASE);

    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;

    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onerror = function(event) {
        throw new Error("NetworkError for: " + packageName);
      }
      xhr.onload = function(event) {
        if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
          var packageData = xhr.response;
          callback(packageData);
        } else {
          throw new Error(xhr.statusText + " : " + xhr.responseURL);
        }
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };

    function runWithFS() {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
      Module['FS_createPath']('/', '.git', true, true);
      Module['FS_createPath']('/.git', 'hooks', true, true);
      Module['FS_createPath']('/.git', 'info', true, true);
      Module['FS_createPath']('/.git', 'logs', true, true);
      Module['FS_createPath']('/.git/logs', 'refs', true, true);
      Module['FS_createPath']('/.git/logs/refs', 'heads', true, true);
      Module['FS_createPath']('/.git/logs/refs', 'remotes', true, true);
      Module['FS_createPath']('/.git/logs/refs/remotes', 'origin', true, true);
      Module['FS_createPath']('/.git', 'objects', true, true);
      Module['FS_createPath']('/.git/objects', '00', true, true);
      Module['FS_createPath']('/.git/objects', '01', true, true);
      Module['FS_createPath']('/.git/objects', '02', true, true);
      Module['FS_createPath']('/.git/objects', '05', true, true);
      Module['FS_createPath']('/.git/objects', '06', true, true);
      Module['FS_createPath']('/.git/objects', '08', true, true);
      Module['FS_createPath']('/.git/objects', '0a', true, true);
      Module['FS_createPath']('/.git/objects', '0b', true, true);
      Module['FS_createPath']('/.git/objects', '0c', true, true);
      Module['FS_createPath']('/.git/objects', '0d', true, true);
      Module['FS_createPath']('/.git/objects', '0e', true, true);
      Module['FS_createPath']('/.git/objects', '10', true, true);
      Module['FS_createPath']('/.git/objects', '12', true, true);
      Module['FS_createPath']('/.git/objects', '14', true, true);
      Module['FS_createPath']('/.git/objects', '16', true, true);
      Module['FS_createPath']('/.git/objects', '18', true, true);
      Module['FS_createPath']('/.git/objects', '1a', true, true);
      Module['FS_createPath']('/.git/objects', '1d', true, true);
      Module['FS_createPath']('/.git/objects', '1e', true, true);
      Module['FS_createPath']('/.git/objects', '1f', true, true);
      Module['FS_createPath']('/.git/objects', '20', true, true);
      Module['FS_createPath']('/.git/objects', '21', true, true);
      Module['FS_createPath']('/.git/objects', '22', true, true);
      Module['FS_createPath']('/.git/objects', '23', true, true);
      Module['FS_createPath']('/.git/objects', '26', true, true);
      Module['FS_createPath']('/.git/objects', '27', true, true);
      Module['FS_createPath']('/.git/objects', '28', true, true);
      Module['FS_createPath']('/.git/objects', '29', true, true);
      Module['FS_createPath']('/.git/objects', '2a', true, true);
      Module['FS_createPath']('/.git/objects', '2c', true, true);
      Module['FS_createPath']('/.git/objects', '2d', true, true);
      Module['FS_createPath']('/.git/objects', '2e', true, true);
      Module['FS_createPath']('/.git/objects', '2f', true, true);
      Module['FS_createPath']('/.git/objects', '30', true, true);
      Module['FS_createPath']('/.git/objects', '31', true, true);
      Module['FS_createPath']('/.git/objects', '33', true, true);
      Module['FS_createPath']('/.git/objects', '35', true, true);
      Module['FS_createPath']('/.git/objects', '36', true, true);
      Module['FS_createPath']('/.git/objects', '3b', true, true);
      Module['FS_createPath']('/.git/objects', '3d', true, true);
      Module['FS_createPath']('/.git/objects', '3f', true, true);
      Module['FS_createPath']('/.git/objects', '40', true, true);
      Module['FS_createPath']('/.git/objects', '45', true, true);
      Module['FS_createPath']('/.git/objects', '46', true, true);
      Module['FS_createPath']('/.git/objects', '48', true, true);
      Module['FS_createPath']('/.git/objects', '49', true, true);
      Module['FS_createPath']('/.git/objects', '4c', true, true);
      Module['FS_createPath']('/.git/objects', '4e', true, true);
      Module['FS_createPath']('/.git/objects', '4f', true, true);
      Module['FS_createPath']('/.git/objects', '50', true, true);
      Module['FS_createPath']('/.git/objects', '51', true, true);
      Module['FS_createPath']('/.git/objects', '52', true, true);
      Module['FS_createPath']('/.git/objects', '55', true, true);
      Module['FS_createPath']('/.git/objects', '56', true, true);
      Module['FS_createPath']('/.git/objects', '5b', true, true);
      Module['FS_createPath']('/.git/objects', '5c', true, true);
      Module['FS_createPath']('/.git/objects', '5f', true, true);
      Module['FS_createPath']('/.git/objects', '61', true, true);
      Module['FS_createPath']('/.git/objects', '63', true, true);
      Module['FS_createPath']('/.git/objects', '64', true, true);
      Module['FS_createPath']('/.git/objects', '65', true, true);
      Module['FS_createPath']('/.git/objects', '67', true, true);
      Module['FS_createPath']('/.git/objects', '6a', true, true);
      Module['FS_createPath']('/.git/objects', '6e', true, true);
      Module['FS_createPath']('/.git/objects', '70', true, true);
      Module['FS_createPath']('/.git/objects', '72', true, true);
      Module['FS_createPath']('/.git/objects', '74', true, true);
      Module['FS_createPath']('/.git/objects', '75', true, true);
      Module['FS_createPath']('/.git/objects', '76', true, true);
      Module['FS_createPath']('/.git/objects', '78', true, true);
      Module['FS_createPath']('/.git/objects', '79', true, true);
      Module['FS_createPath']('/.git/objects', '7a', true, true);
      Module['FS_createPath']('/.git/objects', '7c', true, true);
      Module['FS_createPath']('/.git/objects', '7d', true, true);
      Module['FS_createPath']('/.git/objects', '81', true, true);
      Module['FS_createPath']('/.git/objects', '82', true, true);
      Module['FS_createPath']('/.git/objects', '85', true, true);
      Module['FS_createPath']('/.git/objects', '89', true, true);
      Module['FS_createPath']('/.git/objects', '8a', true, true);
      Module['FS_createPath']('/.git/objects', '8b', true, true);
      Module['FS_createPath']('/.git/objects', '8c', true, true);
      Module['FS_createPath']('/.git/objects', '8d', true, true);
      Module['FS_createPath']('/.git/objects', '91', true, true);
      Module['FS_createPath']('/.git/objects', '92', true, true);
      Module['FS_createPath']('/.git/objects', '94', true, true);
      Module['FS_createPath']('/.git/objects', '95', true, true);
      Module['FS_createPath']('/.git/objects', '98', true, true);
      Module['FS_createPath']('/.git/objects', '99', true, true);
      Module['FS_createPath']('/.git/objects', '9b', true, true);
      Module['FS_createPath']('/.git/objects', '9c', true, true);
      Module['FS_createPath']('/.git/objects', '9e', true, true);
      Module['FS_createPath']('/.git/objects', 'a5', true, true);
      Module['FS_createPath']('/.git/objects', 'a7', true, true);
      Module['FS_createPath']('/.git/objects', 'a9', true, true);
      Module['FS_createPath']('/.git/objects', 'ac', true, true);
      Module['FS_createPath']('/.git/objects', 'af', true, true);
      Module['FS_createPath']('/.git/objects', 'b1', true, true);
      Module['FS_createPath']('/.git/objects', 'b3', true, true);
      Module['FS_createPath']('/.git/objects', 'b4', true, true);
      Module['FS_createPath']('/.git/objects', 'b8', true, true);
      Module['FS_createPath']('/.git/objects', 'ba', true, true);
      Module['FS_createPath']('/.git/objects', 'bb', true, true);
      Module['FS_createPath']('/.git/objects', 'bc', true, true);
      Module['FS_createPath']('/.git/objects', 'bd', true, true);
      Module['FS_createPath']('/.git/objects', 'c1', true, true);
      Module['FS_createPath']('/.git/objects', 'c2', true, true);
      Module['FS_createPath']('/.git/objects', 'c4', true, true);
      Module['FS_createPath']('/.git/objects', 'c6', true, true);
      Module['FS_createPath']('/.git/objects', 'c8', true, true);
      Module['FS_createPath']('/.git/objects', 'c9', true, true);
      Module['FS_createPath']('/.git/objects', 'ca', true, true);
      Module['FS_createPath']('/.git/objects', 'cb', true, true);
      Module['FS_createPath']('/.git/objects', 'cc', true, true);
      Module['FS_createPath']('/.git/objects', 'cd', true, true);
      Module['FS_createPath']('/.git/objects', 'ce', true, true);
      Module['FS_createPath']('/.git/objects', 'cf', true, true);
      Module['FS_createPath']('/.git/objects', 'd0', true, true);
      Module['FS_createPath']('/.git/objects', 'd3', true, true);
      Module['FS_createPath']('/.git/objects', 'd6', true, true);
      Module['FS_createPath']('/.git/objects', 'd8', true, true);
      Module['FS_createPath']('/.git/objects', 'd9', true, true);
      Module['FS_createPath']('/.git/objects', 'da', true, true);
      Module['FS_createPath']('/.git/objects', 'dd', true, true);
      Module['FS_createPath']('/.git/objects', 'de', true, true);
      Module['FS_createPath']('/.git/objects', 'df', true, true);
      Module['FS_createPath']('/.git/objects', 'e0', true, true);
      Module['FS_createPath']('/.git/objects', 'e1', true, true);
      Module['FS_createPath']('/.git/objects', 'e2', true, true);
      Module['FS_createPath']('/.git/objects', 'e3', true, true);
      Module['FS_createPath']('/.git/objects', 'e4', true, true);
      Module['FS_createPath']('/.git/objects', 'e5', true, true);
      Module['FS_createPath']('/.git/objects', 'e6', true, true);
      Module['FS_createPath']('/.git/objects', 'e7', true, true);
      Module['FS_createPath']('/.git/objects', 'e8', true, true);
      Module['FS_createPath']('/.git/objects', 'e9', true, true);
      Module['FS_createPath']('/.git/objects', 'ea', true, true);
      Module['FS_createPath']('/.git/objects', 'eb', true, true);
      Module['FS_createPath']('/.git/objects', 'ec', true, true);
      Module['FS_createPath']('/.git/objects', 'ed', true, true);
      Module['FS_createPath']('/.git/objects', 'ee', true, true);
      Module['FS_createPath']('/.git/objects', 'f0', true, true);
      Module['FS_createPath']('/.git/objects', 'f2', true, true);
      Module['FS_createPath']('/.git/objects', 'f3', true, true);
      Module['FS_createPath']('/.git/objects', 'f6', true, true);
      Module['FS_createPath']('/.git/objects', 'f7', true, true);
      Module['FS_createPath']('/.git/objects', 'fd', true, true);
      Module['FS_createPath']('/.git/objects', 'fe', true, true);
      Module['FS_createPath']('/.git/objects', 'ff', true, true);
      Module['FS_createPath']('/.git/objects', 'info', true, true);
      Module['FS_createPath']('/.git/objects', 'pack', true, true);
      Module['FS_createPath']('/.git', 'refs', true, true);
      Module['FS_createPath']('/.git/refs', 'heads', true, true);
      Module['FS_createPath']('/.git/refs', 'remotes', true, true);
      Module['FS_createPath']('/.git/refs/remotes', 'origin', true, true);
      Module['FS_createPath']('/.git/refs', 'tags', true, true);
      Module['FS_createPath']('/', '.vscode', true, true);
      Module['FS_createPath']('/', 'assets', true, true);
      Module['FS_createPath']('/assets', 'audio', true, true);
      Module['FS_createPath']('/assets', 'graphics', true, true);
      Module['FS_createPath']('/', 'entities', true, true);
      Module['FS_createPath']('/entities', 'ui', true, true);
      Module['FS_createPath']('/', 'lib', true, true);
      Module['FS_createPath']('/', 'systems', true, true);
      Module['FS_createPath']('/', 'util', true, true);

      function DataRequest(start, end, crunched, audio) {
        this.start = start;
        this.end = end;
        this.crunched = crunched;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency']('fp ' + this.name);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

        },
        finish: function(byteArray) {
          var that = this;

        Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        Module['removeRunDependency']('fp ' + that.name);

        this.requests[this.name] = null;
      }
    };

    var files = metadata.files;
    for (i = 0; i < files.length; ++i) {
      new DataRequest(files[i].start, files[i].end, files[i].crunched, files[i].audio).open('GET', files[i].filename);
    }


    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    var IDB_RO = "readonly";
    var IDB_RW = "readwrite";
    var DB_NAME = "EM_PRELOAD_CACHE";
    var DB_VERSION = 1;
    var METADATA_STORE_NAME = 'METADATA';
    var PACKAGE_STORE_NAME = 'PACKAGES';
    function openDatabase(callback, errback) {
      try {
        var openRequest = indexedDB.open(DB_NAME, DB_VERSION);
      } catch (e) {
        return errback(e);
      }
      openRequest.onupgradeneeded = function(event) {
        var db = event.target.result;

        if(db.objectStoreNames.contains(PACKAGE_STORE_NAME)) {
          db.deleteObjectStore(PACKAGE_STORE_NAME);
        }
        var packages = db.createObjectStore(PACKAGE_STORE_NAME);

        if(db.objectStoreNames.contains(METADATA_STORE_NAME)) {
          db.deleteObjectStore(METADATA_STORE_NAME);
        }
        var metadata = db.createObjectStore(METADATA_STORE_NAME);
      };
      openRequest.onsuccess = function(event) {
        var db = event.target.result;
        callback(db);
      };
      openRequest.onerror = function(error) {
        errback(error);
      };
    };

    /* Check if there's a cached package, and if so whether it's the latest available */
    function checkCachedPackage(db, packageName, callback, errback) {
      var transaction = db.transaction([METADATA_STORE_NAME], IDB_RO);
      var metadata = transaction.objectStore(METADATA_STORE_NAME);

      var getRequest = metadata.get("metadata/" + packageName);
      getRequest.onsuccess = function(event) {
        var result = event.target.result;
        if (!result) {
          return callback(false);
        } else {
          return callback(PACKAGE_UUID === result.uuid);
        }
      };
      getRequest.onerror = function(error) {
        errback(error);
      };
    };

    function fetchCachedPackage(db, packageName, callback, errback) {
      var transaction = db.transaction([PACKAGE_STORE_NAME], IDB_RO);
      var packages = transaction.objectStore(PACKAGE_STORE_NAME);

      var getRequest = packages.get("package/" + packageName);
      getRequest.onsuccess = function(event) {
        var result = event.target.result;
        callback(result);
      };
      getRequest.onerror = function(error) {
        errback(error);
      };
    };

    function cacheRemotePackage(db, packageName, packageData, packageMeta, callback, errback) {
      var transaction_packages = db.transaction([PACKAGE_STORE_NAME], IDB_RW);
      var packages = transaction_packages.objectStore(PACKAGE_STORE_NAME);

      var putPackageRequest = packages.put(packageData, "package/" + packageName);
      putPackageRequest.onsuccess = function(event) {
        var transaction_metadata = db.transaction([METADATA_STORE_NAME], IDB_RW);
        var metadata = transaction_metadata.objectStore(METADATA_STORE_NAME);
        var putMetadataRequest = metadata.put(packageMeta, "metadata/" + packageName);
        putMetadataRequest.onsuccess = function(event) {
          callback(packageData);
        };
        putMetadataRequest.onerror = function(error) {
          errback(error);
        };
      };
      putPackageRequest.onerror = function(error) {
        errback(error);
      };
    };

    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;

        // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though
        // (we may be allocating before malloc is ready, during startup).
        if (Module['SPLIT_MEMORY']) Module.printErr('warning: you should run the file packager with --no-heap-copy when SPLIT_MEMORY is used, otherwise copying into the heap may fail due to the splitting');
        var ptr = Module['getMemory'](byteArray.length);
        Module['HEAPU8'].set(byteArray, ptr);
        DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);

        var files = metadata.files;
        for (i = 0; i < files.length; ++i) {
          DataRequest.prototype.requests[files[i].filename].onload();
        }
        Module['removeRunDependency']('datafile_game.data');

      };
      Module['addRunDependency']('datafile_game.data');

      if (!Module.preloadResults) Module.preloadResults = {};

      function preloadFallback(error) {
        console.error(error);
        console.error('falling back to default preload behavior');
        fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, processPackageData, handleError);
      };

      openDatabase(
        function(db) {
          checkCachedPackage(db, PACKAGE_PATH + PACKAGE_NAME,
            function(useCached) {
              Module.preloadResults[PACKAGE_NAME] = {fromCache: useCached};
              if (useCached) {
                console.info('loading ' + PACKAGE_NAME + ' from cache');
                fetchCachedPackage(db, PACKAGE_PATH + PACKAGE_NAME, processPackageData, preloadFallback);
              } else {
                console.info('loading ' + PACKAGE_NAME + ' from remote');
                fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE,
                  function(packageData) {
                    cacheRemotePackage(db, PACKAGE_PATH + PACKAGE_NAME, packageData, {uuid:PACKAGE_UUID}, processPackageData,
                      function(error) {
                        console.error(error);
                        processPackageData(packageData);
                      });
                  }
                  , preloadFallback);
              }
            }
            , preloadFallback);
        }
        , preloadFallback);

      if (Module['setStatus']) Module['setStatus']('Downloading...');

    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

  }
  loadPackage({"package_uuid":"896d0879-9be2-4730-97bf-bdad49ed6530","remote_package_size":2307949,"files":[{"filename":"/.git/COMMIT_EDITMSG","crunched":0,"start":0,"end":134,"audio":false},{"filename":"/.git/FETCH_HEAD","crunched":0,"start":134,"end":235,"audio":false},{"filename":"/.git/HEAD","crunched":0,"start":235,"end":256,"audio":false},{"filename":"/.git/ORIG_HEAD","crunched":0,"start":256,"end":297,"audio":false},{"filename":"/.git/config","crunched":0,"start":297,"end":608,"audio":false},{"filename":"/.git/description","crunched":0,"start":608,"end":681,"audio":false},{"filename":"/.git/hooks/applypatch-msg.sample","crunched":0,"start":681,"end":1159,"audio":false},{"filename":"/.git/hooks/commit-msg.sample","crunched":0,"start":1159,"end":2055,"audio":false},{"filename":"/.git/hooks/fsmonitor-watchman.sample","crunched":0,"start":2055,"end":6781,"audio":false},{"filename":"/.git/hooks/post-update.sample","crunched":0,"start":6781,"end":6970,"audio":false},{"filename":"/.git/hooks/pre-applypatch.sample","crunched":0,"start":6970,"end":7394,"audio":false},{"filename":"/.git/hooks/pre-commit.sample","crunched":0,"start":7394,"end":9037,"audio":false},{"filename":"/.git/hooks/pre-merge-commit.sample","crunched":0,"start":9037,"end":9453,"audio":false},{"filename":"/.git/hooks/pre-push.sample","crunched":0,"start":9453,"end":10827,"audio":false},{"filename":"/.git/hooks/pre-rebase.sample","crunched":0,"start":10827,"end":15725,"audio":false},{"filename":"/.git/hooks/pre-receive.sample","crunched":0,"start":15725,"end":16269,"audio":false},{"filename":"/.git/hooks/prepare-commit-msg.sample","crunched":0,"start":16269,"end":17761,"audio":false},{"filename":"/.git/hooks/push-to-checkout.sample","crunched":0,"start":17761,"end":20544,"audio":false},{"filename":"/.git/hooks/update.sample","crunched":0,"start":20544,"end":24194,"audio":false},{"filename":"/.git/index","crunched":0,"start":24194,"end":28161,"audio":false},{"filename":"/.git/info/exclude","crunched":0,"start":28161,"end":28401,"audio":false},{"filename":"/.git/logs/HEAD","crunched":0,"start":28401,"end":32885,"audio":false},{"filename":"/.git/logs/refs/heads/main","crunched":0,"start":32885,"end":37369,"audio":false},{"filename":"/.git/logs/refs/remotes/origin/main","crunched":0,"start":37369,"end":39994,"audio":false},{"filename":"/.git/objects/00/61e8edfd394d45b93e58c4d31c67dd3c39f65e","crunched":0,"start":39994,"end":40177,"audio":false},{"filename":"/.git/objects/00/7e66ec845143d2938b758dfbe5ef7bd26574f6","crunched":0,"start":40177,"end":40475,"audio":false},{"filename":"/.git/objects/00/9042c56114f8aa14520de2e88c5c0c5b40e057","crunched":0,"start":40475,"end":40621,"audio":false},{"filename":"/.git/objects/01/d6d60670ac5f73fecca7346612bf2946442f5f","crunched":0,"start":40621,"end":40892,"audio":false},{"filename":"/.git/objects/02/6ae59e3b50513597216d6f6a8d5a8c354070cd","crunched":0,"start":40892,"end":41172,"audio":false},{"filename":"/.git/objects/05/b8690666020c84959d894db4bc882d2855842a","crunched":0,"start":41172,"end":41881,"audio":false},{"filename":"/.git/objects/06/6c426d80ba65706c0e4e1f764491ccb25b2e26","crunched":0,"start":41881,"end":42714,"audio":false},{"filename":"/.git/objects/06/fbda6bbdc52eb65362792351333877e85fed93","crunched":0,"start":42714,"end":43018,"audio":false},{"filename":"/.git/objects/08/adf29c60e331a92547b0c4ce4f000440316e15","crunched":0,"start":43018,"end":43454,"audio":false},{"filename":"/.git/objects/0a/533229be4be346292a0a4ba0d519aa56666355","crunched":0,"start":43454,"end":44254,"audio":false},{"filename":"/.git/objects/0a/98b14f8fc76a1efdd3953729acdbfaf559766c","crunched":0,"start":44254,"end":44906,"audio":false},{"filename":"/.git/objects/0a/a0c57dffffa8a2a0a56403258c962d99cb087c","crunched":0,"start":44906,"end":45214,"audio":false},{"filename":"/.git/objects/0b/c20a190827e43ddae837ac82911bf9926b7bf9","crunched":0,"start":45214,"end":45397,"audio":false},{"filename":"/.git/objects/0c/34ab410b348c1d1284cc15d14b4c096ef54d29","crunched":0,"start":45397,"end":45671,"audio":false},{"filename":"/.git/objects/0d/eb27c0d4dde113770973ff9f86c63fa571c21e","crunched":0,"start":45671,"end":90650,"audio":false},{"filename":"/.git/objects/0e/0a91226d6c2cfa68d8df254202fe4cda12d2e9","crunched":0,"start":90650,"end":91359,"audio":false},{"filename":"/.git/objects/10/469dae6b27f24bae94104510499e2e5dd62763","crunched":0,"start":91359,"end":92427,"audio":false},{"filename":"/.git/objects/12/fbf51338f11307a43ca877f183bb3dfe7ffe6f","crunched":0,"start":92427,"end":93031,"audio":false},{"filename":"/.git/objects/14/ab093e8154c4d4c1e9683cd57a8031e2bec88a","crunched":0,"start":93031,"end":129913,"audio":false},{"filename":"/.git/objects/16/830cc0bde0c8da7b2b06dbf071a014a29a16ab","crunched":0,"start":129913,"end":130108,"audio":false},{"filename":"/.git/objects/18/0d95adeeb6a3acbd2eb43a6b1af389f5505edf","crunched":0,"start":130108,"end":130999,"audio":false},{"filename":"/.git/objects/18/903f729602656ca7063744cf3167a7ee1faf2a","crunched":0,"start":130999,"end":131057,"audio":false},{"filename":"/.git/objects/1a/8b05f2796da380ab8abcbbedc6b890ed31359b","crunched":0,"start":131057,"end":131239,"audio":false},{"filename":"/.git/objects/1d/061f5daa354c59e0cc7cac36847fcb5cabb3d6","crunched":0,"start":131239,"end":131430,"audio":false},{"filename":"/.git/objects/1d/ea3661ec5f9fefcac4ecec2f9ee989a918151a","crunched":0,"start":131430,"end":132389,"audio":false},{"filename":"/.git/objects/1e/1c929c65ef7382c327cee1d37ad775e087ea97","crunched":0,"start":132389,"end":133413,"audio":false},{"filename":"/.git/objects/1e/2a83549d1140f155808aa8a8e8b825bd4b5f19","crunched":0,"start":133413,"end":133881,"audio":false},{"filename":"/.git/objects/1e/7821aa48f9ebc0df8f2598675d5793c5416e2d","crunched":0,"start":133881,"end":134112,"audio":false},{"filename":"/.git/objects/1f/12dc4838e6638571a3a6e0b3d320ab82d8d416","crunched":0,"start":134112,"end":192430,"audio":false},{"filename":"/.git/objects/1f/98910f56044da6c8fb0ddd029d54dc14e4b5fb","crunched":0,"start":192430,"end":192488,"audio":false},{"filename":"/.git/objects/1f/e3806041a1b5d8b5a8e2bc9f6f8dd71c3dc195","crunched":0,"start":192488,"end":193270,"audio":false},{"filename":"/.git/objects/20/9792fe77c040c565f6c90c65c2ae7c3afda04c","crunched":0,"start":193270,"end":193527,"audio":false},{"filename":"/.git/objects/21/872a900ce432ce3af0a7dfd6355a575ceef24b","crunched":0,"start":193527,"end":194261,"audio":false},{"filename":"/.git/objects/22/1ca26db931a1ba5148023ad650fb46d3d32411","crunched":0,"start":194261,"end":194467,"audio":false},{"filename":"/.git/objects/23/b3c7202582270b7ffd2fe2fb89d241bacb50e3","crunched":0,"start":194467,"end":194764,"audio":false},{"filename":"/.git/objects/23/c9599a93318c18d14d822b3ee5005d27da119d","crunched":0,"start":194764,"end":195077,"audio":false},{"filename":"/.git/objects/23/ea42a191f9ba99746984d39a2cd38b6780492b","crunched":0,"start":195077,"end":195882,"audio":false},{"filename":"/.git/objects/26/91a70a6ed1dc7a36c4d3a193d293c3af05da79","crunched":0,"start":195882,"end":196229,"audio":false},{"filename":"/.git/objects/27/18e49347d637d43f21786133f3c64e1782eb33","crunched":0,"start":196229,"end":196657,"audio":false},{"filename":"/.git/objects/28/e0a2ff82feb62d0273e11419f2e89a92bcb09b","crunched":0,"start":196657,"end":196853,"audio":false},{"filename":"/.git/objects/29/7dc0a4c729fa10304c1e52d57ecddb06834fcf","crunched":0,"start":196853,"end":197164,"audio":false},{"filename":"/.git/objects/29/d8111f7a3132c1913ea2df4bf5c4eb6ad2a47d","crunched":0,"start":197164,"end":197587,"audio":false},{"filename":"/.git/objects/2a/a0f351c0d347bd89b75d24d686186e50cd80e1","crunched":0,"start":197587,"end":198435,"audio":false},{"filename":"/.git/objects/2c/b48a21407aa9c2c197b8ca6ca377913bc99fc1","crunched":0,"start":198435,"end":199272,"audio":false},{"filename":"/.git/objects/2d/0be1e531a7a162b217cc8966042a09a1756860","crunched":0,"start":199272,"end":199803,"audio":false},{"filename":"/.git/objects/2d/2052b8e73fc794538f2b2fc83a35dfce4dab00","crunched":0,"start":199803,"end":200519,"audio":false},{"filename":"/.git/objects/2d/ce9d6570b2bfbf761f41e49828c8ded098e67f","crunched":0,"start":200519,"end":200707,"audio":false},{"filename":"/.git/objects/2e/c3ff86839d843105dc629611ec838bc3f3ec9e","crunched":0,"start":200707,"end":201239,"audio":false},{"filename":"/.git/objects/2f/3d6d421efef33b0d73c13bf31170efe05d18e2","crunched":0,"start":201239,"end":201449,"audio":false},{"filename":"/.git/objects/2f/68630635a30364835e708ceac2175790ef50ba","crunched":0,"start":201449,"end":201906,"audio":false},{"filename":"/.git/objects/2f/9936f22e3e58d0542c63666e42c48d76bdc025","crunched":0,"start":201906,"end":202632,"audio":false},{"filename":"/.git/objects/30/a983413ab1a0c16d06891884cee2af53712d3a","crunched":0,"start":202632,"end":202895,"audio":false},{"filename":"/.git/objects/31/9406cad4bb925babcf8e4e5c5b8f4d61e09893","crunched":0,"start":202895,"end":203202,"audio":false},{"filename":"/.git/objects/31/d825312a4c15fa23fe7ca2ae0e8c92c70ec82f","crunched":0,"start":203202,"end":204131,"audio":false},{"filename":"/.git/objects/33/e21901bdbe5e3fd072815aede1f7497a45edb3","crunched":0,"start":204131,"end":204276,"audio":false},{"filename":"/.git/objects/35/ef6612fe1ad9c49a9790ea65d8567db72ccbbc","crunched":0,"start":204276,"end":204416,"audio":false},{"filename":"/.git/objects/36/dd55fcdef9d727fb340dffab2e8a88492cf8c0","crunched":0,"start":204416,"end":218054,"audio":false},{"filename":"/.git/objects/3b/0c44d3ea01bdad70d17349d71e162a0dc434ae","crunched":0,"start":218054,"end":218250,"audio":false},{"filename":"/.git/objects/3b/852618d9d24aa26d91cd4b116c6f9a7be2b4aa","crunched":0,"start":218250,"end":218433,"audio":false},{"filename":"/.git/objects/3d/82efcad599ca3e87bc0796161340765d7caf41","crunched":0,"start":218433,"end":218787,"audio":false},{"filename":"/.git/objects/3d/ffb3537c575a74d019ead1a6958ac9e76f8e9c","crunched":0,"start":218787,"end":218987,"audio":false},{"filename":"/.git/objects/3f/58b02de9b7f74618dae07f33b7bd5c0b665cc8","crunched":0,"start":218987,"end":219162,"audio":false},{"filename":"/.git/objects/3f/719310a7a3ebca07defc6d2b4020e818fb6ed7","crunched":0,"start":219162,"end":219453,"audio":false},{"filename":"/.git/objects/40/0f8c4095c2aa381a0091044fad39bb6b6cbc9d","crunched":0,"start":219453,"end":219711,"audio":false},{"filename":"/.git/objects/40/e862ce792418abe4bea1ad7b621d03d4258e47","crunched":0,"start":219711,"end":220237,"audio":false},{"filename":"/.git/objects/45/d5dee0b4df989b854e8fc024e6858b5d52e3c5","crunched":0,"start":220237,"end":220693,"audio":false},{"filename":"/.git/objects/46/e02a8b5916c8188249cc75cf91ba37f5c5906b","crunched":0,"start":220693,"end":220996,"audio":false},{"filename":"/.git/objects/48/2b6927042c4fa0ea8699a407642ff179c53419","crunched":0,"start":220996,"end":221239,"audio":false},{"filename":"/.git/objects/48/adfcea9f2a494417fb41a3f3baec61f7508cfe","crunched":0,"start":221239,"end":222037,"audio":false},{"filename":"/.git/objects/49/f9cbe9336c82bbed304dea460945387ce0db67","crunched":0,"start":222037,"end":222679,"audio":false},{"filename":"/.git/objects/4c/212b3882dcfc616cd25d731e6c4c5163259784","crunched":0,"start":222679,"end":222775,"audio":false},{"filename":"/.git/objects/4c/319811d92ef018e7c93315bf08621ba9e2328e","crunched":0,"start":222775,"end":223560,"audio":false},{"filename":"/.git/objects/4e/df841d347ccc47c2bf9a586dcfad59429f4cba","crunched":0,"start":223560,"end":223793,"audio":false},{"filename":"/.git/objects/4f/5db4db17219cefbdb32b72fbdb0cbc95a33f27","crunched":0,"start":223793,"end":223873,"audio":false},{"filename":"/.git/objects/4f/7a4517b74ed5103b7156c1727a43b8605b4da4","crunched":0,"start":223873,"end":224031,"audio":false},{"filename":"/.git/objects/50/2e76772dcd2b86a782d9579b80ab0ded1c9698","crunched":0,"start":224031,"end":224602,"audio":false},{"filename":"/.git/objects/50/41f30808b3599d28c9f3b8a4c54461b2842706","crunched":0,"start":224602,"end":224836,"audio":false},{"filename":"/.git/objects/51/461a4e64d298186de882319786f2b05e837168","crunched":0,"start":224836,"end":225255,"audio":false},{"filename":"/.git/objects/52/97185b224c87f6a42d267cb005425bb68f8e5b","crunched":0,"start":225255,"end":225399,"audio":false},{"filename":"/.git/objects/52/c599607b5e6c0aef129d0fd6e1573723303289","crunched":0,"start":225399,"end":225940,"audio":false},{"filename":"/.git/objects/52/cea583c05a70c50b1ee869310437e82737f6e2","crunched":0,"start":225940,"end":226310,"audio":false},{"filename":"/.git/objects/55/a11b9c1dcdc83c0df8ed604c4a2f4829691080","crunched":0,"start":226310,"end":226645,"audio":false},{"filename":"/.git/objects/56/59f7dbc30f6069214b8ff7e28e335f488555b4","crunched":0,"start":226645,"end":226845,"audio":false},{"filename":"/.git/objects/56/718efbff7df60beca7dea611474c3d8f458a24","crunched":0,"start":226845,"end":227193,"audio":false},{"filename":"/.git/objects/5b/8e3f925f72440e33ed5b59b719fcaeebe68f02","crunched":0,"start":227193,"end":227547,"audio":false},{"filename":"/.git/objects/5c/21ed4c639331de6a0abce6e17284c44f862674","crunched":0,"start":227547,"end":227782,"audio":false},{"filename":"/.git/objects/5c/99404af552abf0270bb8443161eb6f633d960a","crunched":0,"start":227782,"end":227964,"audio":false},{"filename":"/.git/objects/5f/f299d5e199a7dd6164624c95fc100a7ce4d448","crunched":0,"start":227964,"end":228204,"audio":false},{"filename":"/.git/objects/61/3764cb5694ba8583ec4c8c381767b1435483b7","crunched":0,"start":228204,"end":228415,"audio":false},{"filename":"/.git/objects/63/07a569154128d5e75044d8ab6f6dd61772e954","crunched":0,"start":228415,"end":229258,"audio":false},{"filename":"/.git/objects/63/131bc79a1f8bcaca3dd238841985aecf8c7277","crunched":0,"start":229258,"end":229663,"audio":false},{"filename":"/.git/objects/63/d6b504e9d9bcb98c4e37ea20b1ec763fac7a46","crunched":0,"start":229663,"end":229967,"audio":false},{"filename":"/.git/objects/64/89722c547ebefb09ae2c2c60d724fcdbf94bb0","crunched":0,"start":229967,"end":230156,"audio":false},{"filename":"/.git/objects/65/532aad1d2ca5bbb46f1aa110b06afa0e25d36e","crunched":0,"start":230156,"end":230447,"audio":false},{"filename":"/.git/objects/65/e528fd2356ad04903264d58f65b3d3e1bf675c","crunched":0,"start":230447,"end":230644,"audio":false},{"filename":"/.git/objects/67/5136a6dd47b6ba40c63172d19ce8e1cd428f87","crunched":0,"start":230644,"end":231106,"audio":false},{"filename":"/.git/objects/67/c3ef3be78df538c586fbb38fe5f4ebc97181bb","crunched":0,"start":231106,"end":231842,"audio":false},{"filename":"/.git/objects/6a/8474a607b56eb83eb3d176290bd4b851650fd8","crunched":0,"start":231842,"end":232121,"audio":false},{"filename":"/.git/objects/6e/072100b795e34c742fb95c93c11d0d47f9dfda","crunched":0,"start":232121,"end":232296,"audio":false},{"filename":"/.git/objects/70/0a1b03c50ca4f0a50c1897fbaadf25b626d688","crunched":0,"start":232296,"end":232539,"audio":false},{"filename":"/.git/objects/70/487db92b17b1c2d98b41fb5a847a9cf365c34b","crunched":0,"start":232539,"end":232732,"audio":false},{"filename":"/.git/objects/72/b91d533c1273f2740a26de86e24108a6c9cfc4","crunched":0,"start":232732,"end":232932,"audio":false},{"filename":"/.git/objects/72/e8c85e7c1a6cdfa1a4523ea01af4206eda6d83","crunched":0,"start":232932,"end":233328,"audio":false},{"filename":"/.git/objects/74/eb5466addde787bdd7b61c2941971a959f2f83","crunched":0,"start":233328,"end":233628,"audio":false},{"filename":"/.git/objects/75/49834311ccf473e5f8f2648adf73d2f5bf0687","crunched":0,"start":233628,"end":233708,"audio":false},{"filename":"/.git/objects/75/bf2eb4ad73bca684d1945702027941638b4ad8","crunched":0,"start":233708,"end":233980,"audio":false},{"filename":"/.git/objects/76/02db53e2c0cc333e1efb57dc328bc3ec1f0082","crunched":0,"start":233980,"end":234327,"audio":false},{"filename":"/.git/objects/78/f898ca343ac5a4d6de24d6730a4f89bbcd5e38","crunched":0,"start":234327,"end":234784,"audio":false},{"filename":"/.git/objects/79/e7319209f71ddc818bb9faf93fc5f411679cfd","crunched":0,"start":234784,"end":235112,"audio":false},{"filename":"/.git/objects/7a/6c7229e06f100bea99af207393e431b1e1e9a8","crunched":0,"start":235112,"end":235758,"audio":false},{"filename":"/.git/objects/7c/b06bc1845db61d75e0b40eb5983dec5d4ee658","crunched":0,"start":235758,"end":235953,"audio":false},{"filename":"/.git/objects/7c/c55f9739449e63cde5eb3724ecf9d69586d3ab","crunched":0,"start":235953,"end":1033262,"audio":false},{"filename":"/.git/objects/7c/f5d025afd9a2256d47bc0ec99824c6e7f8c7b7","crunched":0,"start":1033262,"end":1033674,"audio":false},{"filename":"/.git/objects/7d/a5c0f5ba7f5bb0508853bc729458a8c2fbea76","crunched":0,"start":1033674,"end":1033906,"audio":false},{"filename":"/.git/objects/7d/b8533e3de0f2c5629ab27a6d07c61575496f6d","crunched":0,"start":1033906,"end":1033959,"audio":false},{"filename":"/.git/objects/81/ab25157cc75c3c18b9055446d1530c3dea4982","crunched":0,"start":1033959,"end":1034153,"audio":false},{"filename":"/.git/objects/82/9ecfe60275f60245952592ffcdabd9468d7783","crunched":0,"start":1034153,"end":1034899,"audio":false},{"filename":"/.git/objects/85/5bb32abf000f7fbaf679f97fde5aad0de006b0","crunched":0,"start":1034899,"end":1035312,"audio":false},{"filename":"/.git/objects/89/1dde8b3bc6a50ef7c77d560b02d9f3c0a81c16","crunched":0,"start":1035312,"end":1035522,"audio":false},{"filename":"/.git/objects/8a/62f190c1004501823f93b100311fd51892a390","crunched":0,"start":1035522,"end":1035721,"audio":false},{"filename":"/.git/objects/8a/b62dd795e231816bf2515c24732dbf5074ac46","crunched":0,"start":1035721,"end":1036146,"audio":false},{"filename":"/.git/objects/8a/bbed2c7362bb51055bd63ffd59f8bd118d4377","crunched":0,"start":1036146,"end":1036343,"audio":false},{"filename":"/.git/objects/8b/c6ea82a66636f12e743524be0c820c13eba4f6","crunched":0,"start":1036343,"end":1045413,"audio":false},{"filename":"/.git/objects/8c/e4117c03c7e9e70199b24ae26db552e1953645","crunched":0,"start":1045413,"end":1045606,"audio":false},{"filename":"/.git/objects/8d/0fbd83f21b6e1b468a787b2d61adee27027724","crunched":0,"start":1045606,"end":1045913,"audio":false},{"filename":"/.git/objects/91/ea91214a906daec4d5c5a0ae7a9d89061d2e49","crunched":0,"start":1045913,"end":1046331,"audio":false},{"filename":"/.git/objects/91/f78b4679ef5b6528dab91561e35514f2465de3","crunched":0,"start":1046331,"end":1046607,"audio":false},{"filename":"/.git/objects/92/2de7374f316321b62069d23e5b9e4ca29e9e4c","crunched":0,"start":1046607,"end":1047256,"audio":false},{"filename":"/.git/objects/94/03a07c4577df45e9a9a68274f39f8894abc2f8","crunched":0,"start":1047256,"end":1047563,"audio":false},{"filename":"/.git/objects/95/54455a146546774852a7a9d4ea88d86d4f4212","crunched":0,"start":1047563,"end":1081930,"audio":false},{"filename":"/.git/objects/98/5a56f156d6b0f722f68c1369f38fba8c758772","crunched":0,"start":1081930,"end":1082709,"audio":false},{"filename":"/.git/objects/99/0678128ca693dbeafa52e35a42e134c9e67ed1","crunched":0,"start":1082709,"end":1083632,"audio":false},{"filename":"/.git/objects/99/8b9a710883151eb94a22c1a9c2de68562a2bf8","crunched":0,"start":1083632,"end":1084004,"audio":false},{"filename":"/.git/objects/9b/043bfb5385b30e9bd79b9f9999b71b88e93004","crunched":0,"start":1084004,"end":1084168,"audio":false},{"filename":"/.git/objects/9c/de295c0245f7b59ffdb8fbf5576652ee5fad16","crunched":0,"start":1084168,"end":1147570,"audio":false},{"filename":"/.git/objects/9c/dffc530b8b7c8a251b2b5ad1e2e78df39719f8","crunched":0,"start":1147570,"end":1147688,"audio":false},{"filename":"/.git/objects/9e/7eb61f7c300eca8a72cc0836d1ed53f4137416","crunched":0,"start":1147688,"end":1147845,"audio":false},{"filename":"/.git/objects/9e/f04d4053c579d5411fa4387c95b805e6d92815","crunched":0,"start":1147845,"end":1148130,"audio":false},{"filename":"/.git/objects/a5/a85fb302298c52b661c4058c73bc944246f5c8","crunched":0,"start":1148130,"end":1148546,"audio":false},{"filename":"/.git/objects/a7/12f5acf76b04f43285fb242020c32cb4a3d376","crunched":0,"start":1148546,"end":1148866,"audio":false},{"filename":"/.git/objects/a7/84b2ff1147dab6fd6a1190a3dc14d542dd2ec2","crunched":0,"start":1148866,"end":1149046,"audio":false},{"filename":"/.git/objects/a9/47c28726b2d04526aef4656886c2c6ed2201d7","crunched":0,"start":1149046,"end":1149501,"audio":false},{"filename":"/.git/objects/a9/aaf15886d1c76761f9f3c739d082a21c1e12ea","crunched":0,"start":1149501,"end":1149769,"audio":false},{"filename":"/.git/objects/ac/bc5f9e63ff8e7e30b8eb1b6bedd0d77d2261f7","crunched":0,"start":1149769,"end":1150047,"audio":false},{"filename":"/.git/objects/af/a092142705a3553aaa9cc93304e2363fe45fe9","crunched":0,"start":1150047,"end":1150106,"audio":false},{"filename":"/.git/objects/b1/637f8e478e1497ae7e1d5f685f0f9ca4441bac","crunched":0,"start":1150106,"end":1150926,"audio":false},{"filename":"/.git/objects/b3/00571b4fca0c0dc0e1dec703bfe6281bef604f","crunched":0,"start":1150926,"end":1151159,"audio":false},{"filename":"/.git/objects/b3/3ace38db54c2be30b7f3da90899dddbb37136d","crunched":0,"start":1151159,"end":1151418,"audio":false},{"filename":"/.git/objects/b4/70312863fe25b8a7099cd3772260fca90f64ba","crunched":0,"start":1151418,"end":1151587,"audio":false},{"filename":"/.git/objects/b8/d16c1e9b69dcfe3991b5c4c35497b738297e33","crunched":0,"start":1151587,"end":1151776,"audio":false},{"filename":"/.git/objects/ba/f7d65700ae8a9b6b96e0a2eb442e5e06a37870","crunched":0,"start":1151776,"end":1152059,"audio":false},{"filename":"/.git/objects/bb/0b7437967b4bf1ce2f826510bfecf2c25a712a","crunched":0,"start":1152059,"end":1152513,"audio":false},{"filename":"/.git/objects/bc/964616ab304809c33c4a046b31b597ffaf6916","crunched":0,"start":1152513,"end":1152915,"audio":false},{"filename":"/.git/objects/bd/6fe51865beeb80375e7531ee3ebf8c8cfe1b22","crunched":0,"start":1152915,"end":1153061,"audio":false},{"filename":"/.git/objects/bd/974f48516741ab0fde0bd03a89751a66129429","crunched":0,"start":1153061,"end":1154001,"audio":false},{"filename":"/.git/objects/c1/9d2160374ee483f96b2e638b6243237039dc90","crunched":0,"start":1154001,"end":1154803,"audio":false},{"filename":"/.git/objects/c1/a9606cee8e9c161b938007a6408525a3a76a15","crunched":0,"start":1154803,"end":1155044,"audio":false},{"filename":"/.git/objects/c2/e04dbbcc8ae5140ce61a691a7b650a44564648","crunched":0,"start":1155044,"end":1155317,"audio":false},{"filename":"/.git/objects/c4/9e04b31ccd14df387c818a98c954c36dba92aa","crunched":0,"start":1155317,"end":1155496,"audio":false},{"filename":"/.git/objects/c6/29a06f2dca57959b4f917d11612a1f0529b6a1","crunched":0,"start":1155496,"end":1156040,"audio":false},{"filename":"/.git/objects/c8/014ac01d9971983e0cb97eca56e5085b6cb6dd","crunched":0,"start":1156040,"end":1156135,"audio":false},{"filename":"/.git/objects/c9/bf1dafe9f2d0d50d448ef1d145df5882aa27ce","crunched":0,"start":1156135,"end":1156593,"audio":false},{"filename":"/.git/objects/ca/1e2868d19be2e2e080de21254414eadd53d68d","crunched":0,"start":1156593,"end":1156780,"audio":false},{"filename":"/.git/objects/ca/2104d2e2708dc8437d35051436d747bff59a12","crunched":0,"start":1156780,"end":1156970,"audio":false},{"filename":"/.git/objects/ca/978724d1a3805c4db74d6abf56f5e6d0dfffb8","crunched":0,"start":1156970,"end":1157174,"audio":false},{"filename":"/.git/objects/ca/c6f35e1a6d581991a54c0e83319e02ee3def0c","crunched":0,"start":1157174,"end":1157477,"audio":false},{"filename":"/.git/objects/cb/f9e198744dd64c0ae621b6de51201ca5783e9d","crunched":0,"start":1157477,"end":1157845,"audio":false},{"filename":"/.git/objects/cc/695c167838c36adc1a8fbdabc864e945c260a6","crunched":0,"start":1157845,"end":1158020,"audio":false},{"filename":"/.git/objects/cc/7b3afe2fc1b40add6e48f0c6aa2aeb6f75be4b","crunched":0,"start":1158020,"end":1158627,"audio":false},{"filename":"/.git/objects/cc/834ab6f8bddacf72ca6a3723dbf0b0d91c7f9d","crunched":0,"start":1158627,"end":1158903,"audio":false},{"filename":"/.git/objects/cd/2c734c89c1d88ea8536bc673bd481ad286c220","crunched":0,"start":1158903,"end":1159231,"audio":false},{"filename":"/.git/objects/ce/79436455cce37c7b7cc285b42e958510e8e5c2","crunched":0,"start":1159231,"end":1159283,"audio":false},{"filename":"/.git/objects/cf/795b0da47c68980ed9ccce82c345727c5bad38","crunched":0,"start":1159283,"end":1160226,"audio":false},{"filename":"/.git/objects/cf/8c9a5daadedee10b36fe6edf79d1564d760470","crunched":0,"start":1160226,"end":1160679,"audio":false},{"filename":"/.git/objects/d0/97bb9daf0d20b9d46a3c0a26a9c23259e62694","crunched":0,"start":1160679,"end":1160973,"audio":false},{"filename":"/.git/objects/d3/355260bc6fef6518f61170c41f943a36b68e9e","crunched":0,"start":1160973,"end":1161247,"audio":false},{"filename":"/.git/objects/d6/1e2838edb73dde86e9ccdd1fe50ab01e48b961","crunched":0,"start":1161247,"end":1161646,"audio":false},{"filename":"/.git/objects/d6/477c9fedcda84820fb1b80f17aaddf63f91607","crunched":0,"start":1161646,"end":1161814,"audio":false},{"filename":"/.git/objects/d6/d67303a3928e48a86dfeab4843676cfbcff4e0","crunched":0,"start":1161814,"end":1161997,"audio":false},{"filename":"/.git/objects/d8/da1cbd938416aa9a3d18e5cc943a55563165e7","crunched":0,"start":1161997,"end":1162310,"audio":false},{"filename":"/.git/objects/d9/d3cf61a1c8705956ee9ad762525b150f7d98f4","crunched":0,"start":1162310,"end":1162675,"audio":false},{"filename":"/.git/objects/da/0a298bd1c8bea33ca62a128df233fe83ad260a","crunched":0,"start":1162675,"end":1162765,"audio":false},{"filename":"/.git/objects/dd/72086b05356f5d6c2b19f135f677c7b8270827","crunched":0,"start":1162765,"end":1163082,"audio":false},{"filename":"/.git/objects/dd/d1807e92eb48b61a59def904c90676a3adb2dc","crunched":0,"start":1163082,"end":1163386,"audio":false},{"filename":"/.git/objects/de/439e5b47afaf712260d14649887f05c8496490","crunched":0,"start":1163386,"end":1163503,"audio":false},{"filename":"/.git/objects/de/58ae286258e6fec10fae1bceb62c2051fb7054","crunched":0,"start":1163503,"end":1163683,"audio":false},{"filename":"/.git/objects/df/433a9b465fa5490c154dd8025e3a1d314fa9de","crunched":0,"start":1163683,"end":1164059,"audio":false},{"filename":"/.git/objects/e0/64a3b9aeb2f4b9bc4631ad5912447393d81e41","crunched":0,"start":1164059,"end":1164479,"audio":false},{"filename":"/.git/objects/e0/f4a01a830ffdd7ec581a89ee222dceae50b42e","crunched":0,"start":1164479,"end":1164701,"audio":false},{"filename":"/.git/objects/e1/043957e6a3ce6a041db633eceaa395e08a950c","crunched":0,"start":1164701,"end":1164897,"audio":false},{"filename":"/.git/objects/e1/411457498bd602b003d187d195446e51fd9e98","crunched":0,"start":1164897,"end":1165596,"audio":false},{"filename":"/.git/objects/e2/286cfb6be6e74be819e99d90b23a9424cdca49","crunched":0,"start":1165596,"end":1165903,"audio":false},{"filename":"/.git/objects/e3/bfd2dfb74896b06437b4adebbf1efac3d444ea","crunched":0,"start":1165903,"end":1166377,"audio":false},{"filename":"/.git/objects/e3/e95b57047cadb99bdc97022f6f913b9648fc73","crunched":0,"start":1166377,"end":1167379,"audio":false},{"filename":"/.git/objects/e4/53d89a5186c7954e8cb212606493a065848ac3","crunched":0,"start":1167379,"end":1167438,"audio":false},{"filename":"/.git/objects/e4/c063d6d71ed107c9ccac4691dfa20b47214b20","crunched":0,"start":1167438,"end":1167677,"audio":false},{"filename":"/.git/objects/e4/e52a96319fe63c09b8add5f74afed2c4f0cf58","crunched":0,"start":1167677,"end":1168135,"audio":false},{"filename":"/.git/objects/e4/fd3e11f4407ab1a9ecabb86009e040e2800ce6","crunched":0,"start":1168135,"end":1169100,"audio":false},{"filename":"/.git/objects/e5/728ab93ee216c92d17e0a9e5e979024f62113c","crunched":0,"start":1169100,"end":1170294,"audio":false},{"filename":"/.git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391","crunched":0,"start":1170294,"end":1170309,"audio":false},{"filename":"/.git/objects/e7/00d9082dc7f48f7e0cfc2a33c898f466a816b7","crunched":0,"start":1170309,"end":1170389,"audio":false},{"filename":"/.git/objects/e7/0c657e53d52ef08c9aebd1002d9c8e40225042","crunched":0,"start":1170389,"end":1171015,"audio":false},{"filename":"/.git/objects/e8/9bcadb87f69b2bf2db40c14afc137652888da0","crunched":0,"start":1171015,"end":1171216,"audio":false},{"filename":"/.git/objects/e9/53d468ae4a1b90bb5670fe33560378d7eaa3e8","crunched":0,"start":1171216,"end":1171382,"audio":false},{"filename":"/.git/objects/ea/ca56c6f069c25047dc979059d550891606e307","crunched":0,"start":1171382,"end":1172127,"audio":false},{"filename":"/.git/objects/eb/10d06ba1a1da28041fcf2a56471e44a679575c","crunched":0,"start":1172127,"end":1172338,"audio":false},{"filename":"/.git/objects/ec/b77a5bb6bb3e2dff989a38bc151816042d41b2","crunched":0,"start":1172338,"end":1172947,"audio":false},{"filename":"/.git/objects/ed/36122f646c9a07ad998b0989401b72dc26a6b3","crunched":0,"start":1172947,"end":1173217,"audio":false},{"filename":"/.git/objects/ee/fa6fbc40b7688cc3ecff554b6dd31c477fa35a","crunched":0,"start":1173217,"end":1173984,"audio":false},{"filename":"/.git/objects/f0/f06e144bdc60646be8c339c15c9030fadd7d56","crunched":0,"start":1173984,"end":1174346,"audio":false},{"filename":"/.git/objects/f2/9e14b6de7fe9cc85a24af1064476c1f7be0c6c","crunched":0,"start":1174346,"end":1174476,"audio":false},{"filename":"/.git/objects/f3/a116945734be9d7b72044a395b12318438a8d9","crunched":0,"start":1174476,"end":1175471,"audio":false},{"filename":"/.git/objects/f6/f9375e42cedaab3cd5c8d8c67edd7cd41ba243","crunched":0,"start":1175471,"end":1175639,"audio":false},{"filename":"/.git/objects/f7/35cfa293817a89171587993112f44e00582988","crunched":0,"start":1175639,"end":1175849,"audio":false},{"filename":"/.git/objects/fd/db784178c55cee6e4dc85f5e5792d669a740ea","crunched":0,"start":1175849,"end":1176198,"audio":false},{"filename":"/.git/objects/fe/0fd47853e87023e49d383804129aa8a3fbbcd0","crunched":0,"start":1176198,"end":1176379,"audio":false},{"filename":"/.git/objects/ff/0d066be340cc185127a762c2df0299e8b15c95","crunched":0,"start":1176379,"end":1176568,"audio":false},{"filename":"/.git/refs/heads/main","crunched":0,"start":1176568,"end":1176609,"audio":false},{"filename":"/.git/refs/remotes/origin/main","crunched":0,"start":1176609,"end":1176650,"audio":false},{"filename":"/.vscode/settings.json","crunched":0,"start":1176650,"end":1176823,"audio":false},{"filename":"/assets/audio/au.mp3","crunched":0,"start":1176823,"end":1222135,"audio":true},{"filename":"/assets/audio/gun1.mp3","crunched":0,"start":1222135,"end":1284535,"audio":true},{"filename":"/assets/audio/gun2.mp3","crunched":0,"start":1284535,"end":1351735,"audio":true},{"filename":"/assets/audio/gun3.mp3","crunched":0,"start":1351735,"end":1391095,"audio":true},{"filename":"/assets/audio/gun4.mp3","crunched":0,"start":1391095,"end":1441015,"audio":true},{"filename":"/assets/audio/slap.mp3","crunched":0,"start":1441015,"end":1456061,"audio":true},{"filename":"/assets/graphics/gun.png","crunched":0,"start":1456061,"end":2255036,"audio":false},{"filename":"/assets/graphics/tile_0109.png","crunched":0,"start":2255036,"end":2255223,"audio":false},{"filename":"/assets/graphics/tile_0111.png","crunched":0,"start":2255223,"end":2255445,"audio":false},{"filename":"/assets/graphics/tile_0113.png","crunched":0,"start":2255445,"end":2255669,"audio":false},{"filename":"/assets/graphics/tile_0137.png","crunched":0,"start":2255669,"end":2255892,"audio":false},{"filename":"/config.lua","crunched":0,"start":2255892,"end":2256477,"audio":false},{"filename":"/entities/gun.lua","crunched":0,"start":2256477,"end":2256715,"audio":false},{"filename":"/entities/tiny_bullet.lua","crunched":0,"start":2256715,"end":2257567,"audio":false},{"filename":"/entities/tiny_enemy.lua","crunched":0,"start":2257567,"end":2258531,"audio":false},{"filename":"/entities/tiny_enemy_spawner.lua","crunched":0,"start":2258531,"end":2258908,"audio":false},{"filename":"/entities/tiny_player.lua","crunched":0,"start":2258908,"end":2260893,"audio":false},{"filename":"/entities/ui/health_bar.lua","crunched":0,"start":2260893,"end":2261912,"audio":false},{"filename":"/input.lua","crunched":0,"start":2261912,"end":2262506,"audio":false},{"filename":"/lib/tiny.lua","crunched":0,"start":2262506,"end":2289600,"audio":false},{"filename":"/main.lua","crunched":0,"start":2289600,"end":2292137,"audio":false},{"filename":"/spatial_hash.lua","crunched":0,"start":2292137,"end":2293734,"audio":false},{"filename":"/systems/bullet_removal_system.lua","crunched":0,"start":2293734,"end":2294235,"audio":false},{"filename":"/systems/collision_system.lua","crunched":0,"start":2294235,"end":2297624,"audio":false},{"filename":"/systems/difficulty_system.lua","crunched":0,"start":2297624,"end":2298205,"audio":false},{"filename":"/systems/draw_system.lua","crunched":0,"start":2298205,"end":2298477,"audio":false},{"filename":"/systems/draw_ui_system.lua","crunched":0,"start":2298477,"end":2298695,"audio":false},{"filename":"/systems/enemy_controller_system.lua","crunched":0,"start":2298695,"end":2299465,"audio":false},{"filename":"/systems/enemy_spawner_system.lua","crunched":0,"start":2299465,"end":2300297,"audio":false},{"filename":"/systems/enemy_velocity_clamp_system.lua","crunched":0,"start":2300297,"end":2301024,"audio":false},{"filename":"/systems/friction_system.lua","crunched":0,"start":2301024,"end":2301605,"audio":false},{"filename":"/systems/gun_system.lua","crunched":0,"start":2301605,"end":2303320,"audio":false},{"filename":"/systems/hit_system.lua","crunched":0,"start":2303320,"end":2304814,"audio":false},{"filename":"/systems/invulnerability_system.lua","crunched":0,"start":2304814,"end":2305208,"audio":false},{"filename":"/systems/killer_system.lua","crunched":0,"start":2305208,"end":2305691,"audio":false},{"filename":"/systems/player_controller_system.lua","crunched":0,"start":2305691,"end":2306684,"audio":false},{"filename":"/systems/stun_system.lua","crunched":0,"start":2306684,"end":2306991,"audio":false},{"filename":"/systems/velocity_system.lua","crunched":0,"start":2306991,"end":2307303,"audio":false},{"filename":"/util/play_sound.lua","crunched":0,"start":2307303,"end":2307949,"audio":false}]});

})();
