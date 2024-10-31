type DeviceType = 'isDesktop' | 'isTablet' | 'isMobile';

function getDeviceType(): DeviceType {
    const width = window.innerWidth;

    if (width > 1224) {
        return 'isDesktop';
    } else if (width >= 768) {
        return 'isTablet';
    } else {
        return 'isMobile';
    }
}

export { getDeviceType }
