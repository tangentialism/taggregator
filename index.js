var Promise = require('bluebird');
var util = require('util');
var http = Promise.promisifyAll(require('needle'));
var _ = require('lodash');
var valid = require('validator');

var Taggregator = function(urls, options) {
  this.db = {
    sources: [],
    tags: {}
  };

  this.options = _.extend({
    tagWithFilename: false
  }, options);

  this.urls = [].concat(urls);

  var self = this;

  var parsePayload = function(data) {
    return Promise.try(function() {
      // We can process files with either a "tags" or "urls" key, or both.
      if (data.tags) {
        // process tags
        Object.keys(data.tags).forEach(function(tag) {
          processTag(tag, data.tags[tag]);
        });
      }
      
      if (data.urls) {
        // process urls
        Object.keys(data.urls).forEach(function(url) {
          processUrl(url, data.urls[url]);
        });
      }
      
      if (!data.tags && !data.urls) {
        throw new Error('You need either a "keys" or "urls" object');
      }

      Object.keys(self.db.tags).forEach(function(tag) {
        self.db.tags[tag] = _.uniq(self.db.tags[tag]);
      });
    })
    .catch(function(err) {
      console.log(err);
    });
  };

  var processTag = function(tag, vals) {
    // File URLs by parsing through tags' associated urls
    vals.forEach(function(url) {
      insertRecord(tag, url);

      if (self.options.tagWithFilename) {
        insertRecord(extractBasename(url), url)
      }
    });
  };

  var processUrl = function(url, vals) {
    // File URLs by parsing through urls' associated tags
    vals.forEach(function(tag) {
      insertRecord(tag, url);
    });

    if (self.options.tagWithFilename) {
      insertRecord(extractBasename(url), url)
    }
  };

  var insertRecord = function(tag, url) {
    if (typeof tag === Number) {
      tag = Number.toString(tag);
    }

    if (!valid.isURL(url, {require_protocol: true})) {
      // maybe it's just missing the protocol.
      if (valid.isURL(url, {require_protocol: false})) {
        url = 'http://' + url;
      }
      // or, uh, maybe it's just really bad.
      if (!valid.isURL(url, {require_protocol: true})) {
        throw new Error('Attempted to insert invalid URL:', url);
      }
    }

    if (self.db.tags[tag] && util.isArray(self.db.tags[tag])) {
      self.db.tags[tag].push(url);
    }
    else {
      self.db.tags[tag] = [url];
    }
    return self.db.tags[tag].length;
  };

  var fetchPayload = function(url) {
    return http.getAsync(url)
    .then(function(res) {
      self.db.sources.push(url);
      parsePayload(res[1]);
    }).catch(function(e) {
      console.log('Fetch error: ' + e.message);
    });
  };

  // This method is kind of shady. Won't work on domain-only URLs.
  var extractBasename = function(url) {
    var urlParts = url.split('/');
    var filename = urlParts.pop();
    var basename = filename.split('.')[0];
    return basename;
  }

  var process = Promise.method(function() {
    return Promise.try(function() {
      if (self.urls.length == 0) {
        throw new Error('You need to check at least one URL, buddy.');
      }
      return self.urls;
    })
    .each(function(url) {
      return fetchPayload(url);
    })
    .then(function() {
      return self.db;
    }); 
  });

  this.process = process;
};

module.exports = Taggregator;
