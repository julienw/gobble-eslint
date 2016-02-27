var Linter = require( 'eslint' ).CLIEngine;

module.exports = function eslint ( inputdir, options ) {
	var log = this.log;

	var reportOnly = options.reportOnly;
	var reporter = options.reporter;
  var useGrowl = options.growl;

	delete options.reporter;
	delete options.reportOnly;
  delete options.growl;

  // This is necessary for eslint to lint files in .gobble directories
  options.dotfiles = true;

  // This is necessary for eslint to lint files in .gobble directories
  options.dotfiles = true;

  var linter = new Linter(options);
  var reports = linter.executeOnFiles([ inputdir ]);

  if ( reports.errorCount || reports.warningCount ) {
    var formatter = Linter.getFormatter(reporter);
    console.log(formatter( reports.results ));

    if ( !reportOnly && reports.errorCount ) {
      throw new Error( 'Linting failed' );
    }
  }

  if (useGrowl) {
    var notification = 'Result: ' + reports.errorCount + ' errors, ' +
      reports.warningCount + ' warnings';

    require('growl')(notification, { title: 'ESLint' });
  }

  return Promise.resolve();
};
