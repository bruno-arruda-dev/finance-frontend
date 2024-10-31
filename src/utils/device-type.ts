type DeviceType = 'isDesktop' | 'isTablet' | 'isMobile';

function getDeviceType(): DeviceType {
    const width = typeof window != 'undefined' ? window.innerWidth : 1224;

    if (width > 1224) {
        return 'isDesktop';
    } else if (width >= 768) {
        return 'isTablet';
    } else {
        return 'isMobile';
    }
}

export { getDeviceType }
