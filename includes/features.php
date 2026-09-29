<?php
if (!defined('ALLOWED_ACCESS')) {
    header('HTTP/1.1 403 Forbidden');
    exit('Direct access to this file is not allowed.');
}

/**
 * Optional site features, toggled in Admin > Settings > General.
 *
 * $features lives in config.settings.php. A key that is absent counts as
 * ENABLED, so an existing installation upgrading to this version keeps
 * everything it already had rather than silently losing pages.
 */
function feature_enabled(string $key): bool
{
    global $features;
    if (!isset($features) || !is_array($features) || !array_key_exists($key, $features)) {
        return true;
    }
    return (bool)$features[$key];
}

/**
 * Guard a page that belongs to an optional feature. When the feature is off the
 * page redirects home, so a bookmark or stale link cannot reach a disabled
 * section - hiding only the navigation would leave it quietly reachable.
 */
function require_feature(string $key): void
{
    if (feature_enabled($key)) {
        return;
    }
    global $base_path;
    header('Location: ' . ($base_path ?? '/'));
    exit;
}
