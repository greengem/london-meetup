import { MarkerF, OverlayView } from '@react-google-maps/api'
import React, { useContext } from 'react'
import BusinessItem from './BusinessItem'
import { SelectedBusinessContext } from '@/context/SelectedBusinessContext';

export default function Markers({business}) {
    const {selectedBusiness, setSelectedBusiness} = useContext(SelectedBusinessContext);

    return (
        <div>
            <MarkerF 
                position={business.geometry.location}
                onClick={() => setSelectedBusiness(business)}
            >
                {selectedBusiness.reference==business.reference? 
                <OverlayView
                    position={business.geometry.location}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                    <div className='ml-[-90px] mt-[-200px]'>
                        <BusinessItem business={business} showDir={true} />
                    </div>
                </OverlayView>
                :null}
            </MarkerF>
        </div>
    )
}
