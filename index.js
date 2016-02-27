var Linter = require( 'eslint' ).CLIEngine;

module.exports = function eslint ( inputdir, options ) {
	var log = this.log;

	var reportOnly = options.reportOnly;
	var reporter = options.reporter;

	delete options.reporter;
	delete options.reportOnly;

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

  return Promise.resolve();
};
