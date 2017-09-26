// import {appName} from 'config/server';
// import {User, Product} from 'models';
import DirWatcher from 'modules/DirWatcher';

const dirWatcher = new DirWatcher();
dirWatcher.watch('./data', 100);
