import type { MirrorablePublication } from '@hey/lens';
import type { FC } from 'react';

import { ChatBubbleLeftIcon, NoSymbolIcon } from '@heroicons/react/24/outline';
import { HEY_API_URL } from '@hey/data/constants';
import { Button } from '@hey/ui';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useLensAuthData from 'src/hooks/useAuthApiHeaders';
import { useFeatureFlagsStore } from 'src/store/persisted/useFeatureFlagsStore';

interface SuspendButtonsProps {
  onClick?: () => void;
  publication: MirrorablePublication;
}

const SuspendButtons: FC<SuspendButtonsProps> = ({ onClick, publication }) => {
  const { staffMode } = useFeatureFlagsStore();
  const lensAuthData = useLensAuthData();

  if (!staffMode) {
    return null;
  }

  const updateFeatureFlag = (id: string) => {
    onClick?.();
    toast.promise(
      axios.post(
        `${HEY_API_URL}/internal/features/assign`,
        { enabled: true, id, profile_id: publication.by.id },
        { headers: { ...lensAuthData } }
      ),
      {
        error: 'Error suspending profile',
        loading: 'Suspending profile...',
        success: 'Profile suspended'
      }
    );
  };

  return (
    <>
      <Button
        className="flex justify-center"
        icon={<NoSymbolIcon className="size-4" />}
        onClick={() =>
          updateFeatureFlag('8ed8b26a-279d-4111-9d39-a40164b273a0')
        }
        outline
        size="sm"
        variant="danger"
      >
        Profile Suspend
      </Button>
      <Button
        className="flex justify-center"
        icon={<ChatBubbleLeftIcon className="size-4" />}
        onClick={() =>
          updateFeatureFlag('df931ea4-109f-4fde-a8b5-4b2170730e8c')
        }
        outline
        size="sm"
        variant="danger"
      >
        Comment Suspend
      </Button>
    </>
  );
};

export default SuspendButtons;
